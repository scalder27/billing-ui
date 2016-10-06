import { PureComponent, PropTypes } from "react";
import cx from "classnames";

import Icon, { IconTypes } from "../Icon";
import { Dropdown, Option } from "../Dropdown";

import styles from "./ContactsDropdown.scss";

export class ContactsDropdown extends PureComponent {
    render() {
        const { contacts } = this.props;
        const hasDirectorContacts = contacts.some(contact => contact.IsDirector);
        const directorIcon = <Icon type={IconTypes.Crown} className={styles["director-icon"]} />;

        return (
            <Dropdown { ...this.props }>
                {contacts.map((contact) => (
                    <Option key={contact.ContactId}
                            value={contact.ContactId}
                            caption={contact.FullName}
                            beforeCaption={contact.IsDirector && directorIcon}
                            wrapperClassName={cx({[styles["has-director"]]: hasDirectorContacts })}
                    >
                        <div className={styles["name"]}>{contact.FullName}</div>
                        <div className={styles["job"]}>{contact.Post}</div>
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

    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            IsDirector: PropTypes.bool,
            ContactId: PropTypes.string,
            FullName: PropTypes.string,
            Post: PropTypes.string
        })
    )
};

export default ContactsDropdown;
