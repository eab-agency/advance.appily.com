import React from 'react';
import { ModalWrapper, Reoverlay } from 'reoverlay';

const InquireModal = () => {
    const closeModal = () => {
        Reoverlay.hideAll();
    };
    const email = 'help@cappexhealth.com';
    return (
        <ModalWrapper
            contentContainerClassName="modal-content"
            wrapperClassName="modal-help-wrapper"
            onClose={() => Reoverlay.hideModal()}
            animation="slideUp"
        >
            <div className="help">
                <div className="head-content">
                    <h2>Help</h2>
                    <p>
                        If you require assistance in using this site, please
                        contact the Help Center at{' '}
                        <a href={`mailto:${email}`}>{email}.</a>
                    </p>
                </div>
            </div>

            <button className="close-modal" type="button" onClick={closeModal}>
                Close modal
            </button>
        </ModalWrapper>
    );
};
export default InquireModal;
