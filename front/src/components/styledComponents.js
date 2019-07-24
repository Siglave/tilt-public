import styled, {keyframes} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Card = styled.div`
    border-radius: 2px !important;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
    width: 550px;
    height: 400px;
	color: ${(props) => props.theme.grey6};
	transition: all 0.6s;
`
const Input = styled.input`
    margin: 0;
	padding: 0;
	list-style: none;
	display: inline-block;
	padding: 6px 12px;
	line-height: 1.5em;
	color: ${(props) => props.theme.grey5};
	background-color: ${(props) => props.theme.grey0};
	border: none;
    border-radius: 6px;
    width:100%;
	box-sizing: border-box;
	outline: none;
	transition: all 0.3s;
	font-size :14px;
	border-color: ${(props) => (props.error ? 'red' : props.theme.grey1)};
	box-shadow: inset 0 2px 2px hsla(0, 0%, 0%, 0.1);
	:focus {
		border-color: ${(props) => props.theme.white};
	}
`
const Textarea = styled.textarea`
    margin: 0;
	padding: 0;
	list-style: none;
	display: inline-block;
	padding: 6px 12px;
	line-height: 1.5em;
	color: ${(props) => props.theme.grey5};
	background-color: ${(props) => props.theme.grey0};
	border: none;
    border-radius: 6px;
    width:100%;
	box-sizing: border-box;
	outline: none;
	transition: all 0.3s;
	font-size :14px;
	border-color: ${(props) => (props.error ? 'red' : props.theme.grey1)};
	box-shadow: inset 0 2px 2px hsla(0, 0%, 0%, 0.1);
	:focus {
		border-color: ${(props) => props.theme.white};
	}
`

const Row = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
`;
const Col = styled.div`flex-grow: ${(props) => (typeof props.flexGrow === 'undefined' ? 1 : props.flexGrow)};`;

const FormItem = styled.div`
	display: block;
	line-height: 36px;
	margin-top: 24px;
`;


const Button = styled.button`

	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
    transition: all 0.6s;
	${(props)=>( 
		props.small ? `
		padding: 4px 36px;
		font-size: 10px;
		` :`
		padding: 4px 48px;
		font-size: 12px;
		`
	)}
	${(props)=>( 
		props.primary ? `
		border: 0px solid ${props.theme.primary5};
		color: ${props.theme.white};
		background-color: ${props.theme.primary4}
		:hover {
			background-color: ${props.theme.primary3};
		}
		:focus {
			background-color: ${props.theme.primary3};
		}
		` :""
	)}

	${(props)=>( 
		props.secondary ? `
		border: 0px solid ${props.theme.primary4};
		color: ${props.theme.primary4};
		background-color: ${props.theme.white}
		:hover {
			background-color: ${props.theme.primary1};
		}
		:focus {
			background-color: ${props.theme.primary1};
		}
		` :""
	)}
	${(props)=>( 
		props.delete ? `
		border: 1px solid transparent;
		color: ${props.theme.grey6};
		background-color: ${props.theme.white}
		:hover {
			border: 1px solid ${props.theme.red4};
			color: ${props.theme.red4};
		}
		:focus {
			border: 1px solid ${props.theme.red4};
			color: ${props.theme.red4};
		}
		` :""
	)}
	${(props)=>( 
		props.error ? `
		padding: 4px 48px;
		transform : none;
		border: 0px solid ${props.theme.red4};
		color: ${props.theme.white};
		background-color: ${props.theme.red4}
		:hover {
			background-color: ${props.theme.red5};
		}
		:focus {
			background-color: ${props.theme.red5};
		}
		` :""
	)}
	${(props)=>( 
		props.success ? `
		transform : none;
		padding: 4px 48px;
		border: 0px solid ${props.theme.secondary4};
		color: ${props.theme.white};
		background-color: ${props.theme.secondary4}
		:hover {
			background-color: ${props.theme.secondary4};
		}
		:focus {
			background-color: ${props.theme.secondary4};
		}
		` :""
	)}
	border-radius: 2px;
	font-weight: 500;
	width: ${(props) => (props.full ? '100%' : '')};
	cursor: pointer;
	
`;

const Spin = keyframes`
 from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.span`
	display: block;
	border: 2px solid transparent;
	border-top: 2px solid ${(props) => props.theme.primary4};
	border-bottom: 2px solid ${(props) => props.theme.primary4};
	border-radius: 50%;
	width: 50px;
	height: 50px;
	animation: ${Spin} 2s linear infinite;
	${(props)=>( 
		props.white ? `
		border-top: 2px solid ${props.theme.white};
		border-bottom: 2px solid ${props.theme.white};
		` :""
	)}
	${(props)=>( 
		props.small ? `
			width: 10px;
			height: 10px;
		` :""
	)}
`;
const Icon = styled(FontAwesomeIcon)`
	${(props) =>(
		props.right ? `margin-right: 8px;`: ``)
	};
	${(props) =>(
		props.left ? `margin-left: 8px;`: ``)
	};
	color: ${(props) => props.inherit ? "inherit" :props.theme.grey3};
`
const TrophyIcon = styled(Icon)`
    cursor:pointer;
    font-size: 20px;
    transition: 0.3s;
    ${(props)=> props.isactive === 'true' ? `
        color: ${props.theme.yellow};
    ` : `
        color: ${props.theme.grey2};
    `}
    :hover{
        color: ${(props)=>props.theme.yellow};
    }
`
const UserName = styled(Link)`
   border-bottom: 1px solid ${(props)=>props.theme.primary1};
   font-family: ${(props)=>props.theme.fontFamilyTitle};
`
const UserBlock = styled.div`
    margin: 0px 0px 8px 0px;
    font-size: 14px;
	display: flex;
	align-items: baseline;
`
const ErrorInline = styled.div`
	display: inline;
	padding-bottom: 4px;
	border-bottom: 2px solid ${(props)=>props.theme.red3};
`
const DateP = styled.p`
    font-size: 12px;
    color: ${(props)=>props.theme.grey4};
`
const Select = styled.select`
 	margin: 0;
	padding: 0;
	list-style: none;
	display: inline-block;
	padding: 6px 12px;
	line-height: 1.5em;
	color: ${(props) => props.theme.grey5};
	background-color: ${(props) => props.theme.white};
	border: none;
    border-radius: 4px;
	box-sizing: border-box;
	outline: none;
	transition: all 0.3s;
	font-size :14px;
	box-shadow: inset 0 2px 2px hsla(0, 0%, 0%, 0.1);
`
export {
    Card,
    Input,
    Row,
    Col,
    FormItem,
	Button,
	Loader,
	Icon,
	Textarea,
	TrophyIcon,
	UserName,
	UserBlock,
	ErrorInline,
	DateP,
	Select
}