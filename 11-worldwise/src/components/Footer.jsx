import styles from './Footer.module.css';

function Footer({ publishYear, author }) {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy;
        {Number(publishYear) === new Date().getFullYear()
          ? publishYear + ' '
          : publishYear + '-' + new Date().getFullYear() + ' '}
        {author}
      </p>
    </footer>
  );
}

export default Footer;
