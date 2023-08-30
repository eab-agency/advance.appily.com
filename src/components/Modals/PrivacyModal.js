import React from 'react';
import { ModalWrapper, Reoverlay } from 'reoverlay';

const PrivacyModal = () => {
    const closeModal = () => {
        Reoverlay.hideAll();
    };
    const privacyUrl = `https://www.google.com/privacy-policy/`;

    return (
        <ModalWrapper
            contentContainerClassName="modal-content"
            wrapperClassName="modal__wrapper"
            onClose={() => Reoverlay.hideModal()}
            animation="slideUp"
        >
            <div className="privacy">
                <div className="head-content">
                    <h2>Privacy</h2>
                    <p>
                        This website uses a "cookie," a small text file that is
                        sent to your computer when you first visit. The cookie
                        is stored on your computer and allows you to be
                        recognized when you visit again later. We use cookies to
                        enhance your visits, most often by prefilling your name
                        and other information on forms you submit to us.
                    </p>

                    <p>
                        This website uses remarketing services, such as Google,
                        Facebook and Adroll, to advertise on third-party
                        websites to previous visitors of our site. Third-party
                        vendors place cookies on users' browsers for targeted
                        advertising purposes and serve ads to locations such as
                        the Google search results page or any site in the Google
                        Display Network based on someone's past visits to the
                        website.
                    </p>

                    <p>
                        Data such as identification of your internet browser or
                        computer operating system may be collected for targeted
                        advertising. This information is collected to track
                        usage behavior and compile aggregate data to facilitate
                        content improvements. You may opt out of Google's use of
                        cookies by visiting{' '}
                        <a
                            href="https://www.google.com/settings/u/0/ads/authenticated"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Google's Ads Settings
                        </a>{' '}
                        and{' '}
                        <a href="http://www.networkadvertising.org/choices/">
                            opt out of the additional use of cookies by visiting
                            this site.
                        </a>
                    </p>

                    <p>
                        Google Drive: When you visit certain EAB websites, we
                        may allow users with Google Drive accounts to attach
                        documents from their Google Drive Account to a submitted
                        college enrollment application. The EAB website receives
                        documents selected from a user's Google Drive account
                        during the application process. Such documents are
                        stored temporarily and included in the user's complete,
                        delivered application.
                    </p>

                    <p>
                        You can{' '}
                        <a href={privacyUrl} target="_blank" rel="noreferrer">
                            view the complete privacy policy here.
                        </a>
                    </p>

                    <small>
                        © {new Date().getFullYear()} EAB Global, Inc. Patent
                        Pending. All Rights Reserved.
                    </small>
                </div>
            </div>

            <button className="close-modal" type="button" onClick={closeModal}>
                Close modal
            </button>
        </ModalWrapper>
    );
};
export default PrivacyModal;
