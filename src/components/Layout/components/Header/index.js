import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import routesConfig from '~/config/routes';
import images from '~/assets/images';
import Button from '~/components/Button';
import {
    FeedbackandHelpIcon,
    GetCoinIcon,
    InboxIcon,
    KeyboardShortcutIcon,
    LanguageIcon,
    LogoutIcon,
    MessageIcon,
    PlusIcon,
    SettingIcon,
    UserIcon,
} from '~/components/icons';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import style from './Header.module.scss';

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
    const currentUser = true;

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
                <Link to={routesConfig.home}>
                    <img src={images.logo.default} className={cx('header-logo')} alt="Tiktok" />
                </Link>

                <Search />

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
                            <Image
                                className={cx('user-avatar')}
                                alt="Avatar"
                                src="https://???s3.amazonaws.com/static.revolutionparts.com/assets/images/bmw.png"
                                fallback="https://s3.amazonaws.com/static.revolutionparts.com/assets/images/bmw.png"
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
