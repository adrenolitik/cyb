import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../redux/settings';

import Titile from '../../components/Titile/Titile';
import Button from '../../components/Button/Button';
import Block, { BlockRow } from '../../components/Settings/Block';
import Input from '../../components/Input/Input';
import { SettingsIndicator } from '../../components/Indicator/Indicator';
import {
    ConnectionContainer,
    NodeStatusContainer,
    SettingLabel, SettingRow,
    SettingsContainer,
} from '../../components/Settings/Settings';
import ScrollContainer from '../../components/ScrollContainer/ScrollContainer';


class Settings extends Component {

    componentWillMount() {
        this.props.checkStatus();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.IPFS_END_POINT !== nextProps.IPFS_END_POINT
            || this.props.PARITY_END_POINT !== nextProps.PARITY_END_POINT
            || this.props.CYBERD_END_POINT !== nextProps.CYBERD_END_POINT
            || this.props.CYBERD_WS_END_POINT !== nextProps.CYBERD_WS_END_POINT) {
            this.ipfsInput.value = nextProps.IPFS_END_POINT;
            this.ethInput.value = nextProps.PARITY_END_POINT;
            this.cyberdInput.value = nextProps.CYBERD_END_POINT;
            this.cyberdWSInput.value = nextProps.CYBERD_WS_END_POINT;
        }
    }

    updateIPFS = () => {
        this.props.setIPFS(this.ipfsInput.value);
    };

    updateCyberd = () => {
        this.props.setSearch(this.cyberdInput.value);
    };

    updateEth = (endpoint) => {
        this.props.setParity(endpoint);
    };

    setEthMain = () => {
        this.updateEth('http://earth.cybernode.ai:34545');
    };

    setEthKovan = () => {
        this.updateEth('http://earth.cybernode.ai:34645');
    };

    setEthRinkeby = () => {
        this.updateEth('http://earth.cybernode.ai:34745');
    };

    setEthCustom = () => {
        this.updateEth(this.ethInput.value);
    };

    updateIpfsWrite = () => {
        const url = this.ipfsWriteInput.value;

        this.props.setIpfsWriteUrl(url);
    };

    updateCyberdWS = () => {
        this.props.setSearchWS(this.cyberdWSInput.value);
    }

    render() {
        const {
            IPFS_END_POINT,
            PARITY_END_POINT,
            CYBERD_END_POINT,
            CYBERD_WS_END_POINT,

            ipfsStatus,
            parityStatus,
            cyberdStatus,

            resetAllSettings,
            ipfsWriteUrl,
        } = this.props;

        return (
            <ScrollContainer>
                <Titile>/ Settings</Titile>
                <SettingsContainer>
                    <ConnectionContainer>
                        <Titile inline>CONNECTION</Titile>
                        <Block>

                            <BlockRow>
                                <SettingRow>
                                    <SettingLabel>IPFS read:</SettingLabel>
                                    <Input
                                        inputRef={ node => this.ipfsInput = node }
                                        defaultValue={ IPFS_END_POINT }
                                        style={ { width: 200 } }
                                    />
                                    <Button onClick={ this.updateIPFS }>update</Button>
                                </SettingRow>
                                <SettingRow>
                                    <SettingLabel>IPFS write:</SettingLabel>
                                    <Input
                                        inputRef={ node => this.ipfsWriteInput = node }
                                        defaultValue={ ipfsWriteUrl }
                                        style={ { width: 200 } }
                                    />
                                    <Button onClick={ this.updateIpfsWrite }>update</Button>
                                </SettingRow>
                            </BlockRow>

                            <BlockRow>
                                <SettingRow>
                                    <SettingLabel>ETH node:</SettingLabel>
                                    <Input
                                      inputRef={node => this.ethInput = node }
                                      defaultValue={ PARITY_END_POINT }
                                      style={ { width: 200 } }
                                    />
                                    <Button onClick={ this.setEthCustom }>update</Button>
                                </SettingRow>
                                <SettingRow style={{marginTop: 20}}>
                                    <Button onClick={this.setEthMain}>Main</Button>
                                    <Button onClick={this.setEthRinkeby}>Rikenby</Button>
                                    <Button onClick={this.setEthKovan}>Kovan</Button>
                                </SettingRow>
                            </BlockRow>

                            <BlockRow>
                                <SettingRow>
                                    <SettingLabel>cyberd node:</SettingLabel>
                                    <Input
                                      inputRef={node => this.cyberdInput = node }
                                      defaultValue={ CYBERD_END_POINT }
                                      style={ { width: 200 } }
                                    />
                                    <Button onClick={ this.updateCyberd }>update</Button>
                                </SettingRow>
                                <SettingRow>
                                    <SettingLabel>cyberd ws:</SettingLabel>
                                    <Input
                                      inputRef={node => this.cyberdWSInput = node }
                                      defaultValue={ CYBERD_WS_END_POINT }
                                      style={ { width: 200 } }
                                    />
                                    <Button onClick={ this.updateCyberdWS }>update</Button>
                                </SettingRow>
                            </BlockRow>

                        </Block>
                    </ConnectionContainer>
                    <NodeStatusContainer>
                        <Titile inline>STATUS</Titile>
                        <Block>
                            <BlockRow>
                                <SettingRow>
                                    <SettingsIndicator status={ ipfsStatus } />
                                </SettingRow>
                            </BlockRow>
                            <BlockRow style={ { height: 110 } }>
                                <SettingRow>
                                    <SettingsIndicator status={ parityStatus } />
                                </SettingRow>
                            </BlockRow>
                            <BlockRow>
                                <SettingRow>
                                    <SettingsIndicator status={ cyberdStatus } />
                                </SettingRow>
                            </BlockRow>
                        </Block>
                    </NodeStatusContainer>
                </SettingsContainer>

                <Block>
                    <BlockRow>
                        <SettingRow>
                            <Button color='green' dura='rr.cyb'>CYB ROOT REGISTRY</Button>
                            <Button onClick={ resetAllSettings }>RESET SETTINGS</Button>
                        </SettingRow>
                    </BlockRow>
                </Block>

            </ScrollContainer>
        );
    }
}

export default connect(
    ({ settings }) => ({
        IPFS_END_POINT: settings.IPFS_END_POINT,
        PARITY_END_POINT: settings.PARITTY_END_POINT,
        CYBERD_END_POINT: settings.SEARCH_END_POINT,
        CYBERD_WS_END_POINT: settings.CYBERD_WS_END_POINT,

        ipfsStatus: settings.ipfsStatus,
        parityStatus: settings.ethNodeStatus,
        cyberdStatus: settings.cyberNodeStatus,
        ipfsWriteUrl: actions.getIpfsWriteUrl({settings}),
    }),
    actions,
)(Settings);
