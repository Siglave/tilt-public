import React from 'react';
import { Button, Loader, Icon } from '../components/styledComponents';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const DynamicSubmitButton = ({ submitState, loading, text, small }) => {
    var btn = null;
    if (submitState === 'still') {
        btn = (
            <Button small={small} primary  htmlType="submit">
                {loading ? <Loader small white /> : text }
            </Button>
        );
    }
    if (submitState === 'error') {
        btn = (
            <Button small={small} error  htmlType="submit">
                {loading ? <Loader small white /> : 'Réessayer'}
            </Button>
        );
    }
    if (submitState === 'success') {
        btn = (
            <Button small={small} success disabled style={{ display: 'block' }} htmlType="submit">					
                <Icon inherit="true" icon={faCheck} />
            </Button>
        );
    }
    return btn;
}

export default DynamicSubmitButton;
