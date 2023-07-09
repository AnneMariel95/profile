import {FaDev} from '@react-icons/all-files/fa/FaDev';
import {SiFacebook} from '@react-icons/all-files/si/SiFacebook';
import {SiGithub} from '@react-icons/all-files/si/SiGithub';
import {SiLinkedin} from '@react-icons/all-files/si/SiLinkedin';
import {SiTiktok} from '@react-icons/all-files/si/SiTiktok';
import {SiTwitter} from '@react-icons/all-files/si/SiTwitter';
import NextLink from '../basic/NextLink';
import CustomIcon, {SocialMediaProps} from '../icon/CustomIcon';

export default function SocialMedia() {
  return (
    <div>
      <nav>
        <ul className="flex">
          {socialMedia.map(sm => (
            <li key={sm.title} className="mr-2">
              <NextLink
                href={sm.url}
                target="_blank"
                aria-label={sm.title}
                title={sm.title}
                rel="noreferrer"
              >
                <CustomIcon {...sm} />
                <span aria-hidden className="hidden">
                  {sm.title}
                </span>
              </NextLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const socialMedia: SocialMediaProps[] = [
  {
    url: 'https://www.linkedin.com/in/anne-mariel/',
    icon: SiLinkedin,
    title: 'linkedin',
    color: '',
    hoverColor: '#0a66c2',
  },
  {
    url: 'https://www.tiktok.com/@annemarielism',
    icon: SiTiktok,
    title: 'tiktok',
    color: '',
    hoverColor: '#333333',
  },
  {
    url: 'https://twitter.com/recio_mariel',
    icon: SiTwitter,
    title: 'twitter',
    color: '',
    hoverColor: '#1da1f2',
  },
  {
    url: 'https://www.facebook.com/annemariel.recio',
    icon: SiFacebook,
    title: 'facebook',
    color: '',
    hoverColor: '#1877f2',
  },
  {
    url: 'https://github.com/AnneMariel95',
    icon: SiGithub,
    title: 'github',
    color: '',
    hoverColor: '#333333',
  },
];
