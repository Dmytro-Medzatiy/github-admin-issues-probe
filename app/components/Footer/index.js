import React from 'react';
import styles from './styles.css';
import gitHubLogo from 'assets/images/github-256.png';


function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <span>Training project by </span>
                <a href="https://github.com/Dmytro-Medzatiy">
                    <span>D.Medzatyi </span>
                    <img src={gitHubLogo}
                         alt="github repo"
                         height="30px"
                         width="30px"
                    />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
