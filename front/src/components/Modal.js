import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Dimmer = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.65);
	height: 100%;
	z-index: 1001;
`;
const ModalWrap = styled.div`
	position: fixed;
	overflow: auto;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1001;
	-webkit-overflow-scrolling: touch;
	outline: 0;
`;
const ModalStyle = styled.div`
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	list-style: none;
	position: relative;
	width: 600px;
	margin: 0 auto;
	top: 20%;
	padding-bottom: 24px;
	text-align: initial;
	@media (max-width: 800px) {
        width: 300px;
    }
`;
const ModalContent = styled.div`
	background-color: white;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	border-radius: 4px;
	position: relative;
`;
const CloseModal = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	z-index: 10;
	font-weight: 700;
	padding: 24px;
	cursor: pointer;
	:hover {
		color: grey;
	}
`;
const ModalBody = styled.div`padding: 24px;`;
class Modal extends Component {
	handleClose = (e) => {
		this.props.onCancel(e);
	};
	render() {
		if (this.props.visible) {
			document.querySelector('body').style = 'overflow :hidden; padding-right :15px';
			return (
				<div>
					<Dimmer />
					<ModalWrap>
						<ModalStyle>
							<ModalContent>
								<CloseModal onClick={this.handleClose}>
									<FontAwesomeIcon icon={faTimes} />
								</CloseModal>
								<ModalBody>{this.props.children}</ModalBody>
							</ModalContent>
						</ModalStyle>
					</ModalWrap>
				</div>
			);
		} else {
			document.querySelector('body').style = '';
			return null;
		}
	}
}
export default Modal;
