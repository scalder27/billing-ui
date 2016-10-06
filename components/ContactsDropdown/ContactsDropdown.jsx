import { PureComponent, PropTypes } from "react";
import cx from "classnames";

import Icon, { IconTypes } from "../Icon";
import { Dropdown, Option } from "../Dropdown";

import styles from "./ContactsDropdown.scss";

export class ContactsDropdown extends PureComponent {
    _getDropdownProps = () => {
        let dropdownProps = { ...this.props };
        delete dropdownProps.contacts;
        delete dropdownProps.idFieldName;
        delete dropdownProps.nameFieldName;
        delete dropdownProps.postFieldName;
        delete dropdownProps.isDirectorFieldName;
        delete dropdownProps.optionWrapperClassName;

        return dropdownProps;
    };

    render() {
        const { contacts, idFieldName, nameFieldName, postFieldName, isDirectorFieldName, optionWrapperClassName } = this.props;
        const hasDirectorContacts = contacts.some(contact => contact[isDirectorFieldName]);
        const directorIcon = <Icon type={IconTypes.Crown} className={styles["director-icon"]} />;

        return (
            <Dropdown { ...this._getDropdownProps() }>
                {contacts.map((contact) => (
                    <Option key={contact[idFieldName]}
                            value={contact[idFieldName]}
                            caption={contact[nameFieldName]}
                            beforeCaption={contact[isDirectorFieldName] && directorIcon}
                            additionalData={contact[postFieldName]}
                            fadeCaption={true}
                            wrapperClassName={cx(optionWrapperClassName, {[styles["has-director"]]: hasDirectorContacts })}
                    >
                        {contact[nameFieldName]}
                    </Option>
                ))}
            </Dropdown>
        );
    }
}

ContactsDropdown.propTypes = {
    defaultCaption: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    className: PropTypes.string,
    onSelect: PropTypes.func.isRequired,

    optionWrapperClassName: PropTypes.string,

    contacts: PropTypes.arrayOf(PropTypes.object),
    idFieldName: PropTypes.string,
    nameFieldName: PropTypes.string,
    postFieldName: PropTypes.string,
    isDirectorFieldName: PropTypes.string
};

ContactsDropdown.defaultProps = {
    idFieldName: "ContactId",
    nameFieldName: "FullName",
    postFieldName: "Post",
    isDirectorFieldName: "IsDirector"
};

export default ContactsDropdown;
