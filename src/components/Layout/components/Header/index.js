import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import style from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import {
    FeedbackandHelpIcon,
    GetCoinIcon,
    InboxIcon,
    KeyboardShortcutIcon,
    LanguageIcon,
    LogoutIcon,
    MagnifyingIcon,
    MessageIcon,
    PlusIcon,
    SettingIcon,
    UserIcon,
} from '~/components/icons';

const cx = classNames.bind(style);

const MENU_ITEMS = [
    {
        icon: <LanguageIcon width={'2rem'} height={'2rem'} />,
        title: 'Vietnamese',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tieng Viet',
                },
                {
                    code: 'bra',
                    title: 'Brazil',
                },
            ],
        },
    },
    {
        icon: <FeedbackandHelpIcon width={'2rem'} height={'2rem'} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <KeyboardShortcutIcon width={'2rem'} height={'2rem'} />,
        title: 'Keyboard Shortcut',
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 1000);
    }, []);

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                console.log(menuItem);
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <UserIcon width={'2rem'} height={'2rem'} />,
            title: 'View profile',
            to: '/profile',
        },
        {
            icon: <GetCoinIcon width={'2rem'} height={'2rem'} />,
            title: 'Get coin',
            to: '/coin',
        },
        {
            icon: <SettingIcon width={'2rem'} height={'2rem'} />,
            title: 'Setting',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <LogoutIcon width={'2rem'} height={'2rem'} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo.default} className={cx('header-logo')} alt="Tiktok" />

                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input
                            className={cx('input')}
                            placeholder="Search accounts and videos"
                            spellCheck="false"
                        ></input>
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <MagnifyingIcon width={'2.4rem'} height={'2.4rem'} />
                        </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    <Button outline leftIcon={<PlusIcon width={'2rem'} height={'2rem'} />}>
                        Upload
                    </Button>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon width={'2.6rem'} height={'2.6rem'} />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <img
                                className={cx('user-avatar')}
                                alt="Avatar"
                                src="https://s3.amazonaws.com/static.revolutionparts.com/assets/images/bmw.png"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
