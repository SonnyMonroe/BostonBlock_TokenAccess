import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import Link from "next/link";

export const Header = () => {
    return (
        <nav className={styles.header}>
            <Link href="/">
                <Image
                    src="/mbta.png"
                    alt="thirdweb"
                    width={100}
                    height={75}
                    className={styles.logo}
                />
            </Link>
            <ConnectWallet theme="dark" />
        </nav>
    );
};