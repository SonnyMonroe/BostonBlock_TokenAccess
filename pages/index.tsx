import { ConnectWallet, ThirdwebSDK, useUser } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { getUser } from "./api/auth/[...thirdweb]";
import checkBalance from "../utils/checkBalance";
import { useRouter } from "next/router";
import { use, useEffect } from "react";
import { Header } from "../components/Header";


const Home: NextPage = () => {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.heading}>NFT Gated Content </h2>
        <Header />

        <h1>You Have Access</h1>
        <ConnectWallet />
      </div>
    </main>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      },
    }
  }
  const secretKey = process.env.THIRDWEB_SECRET_KEY;

  if (!secretKey) {
    throw new Error("No Secret Key Found");
  }

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY as string, "mumbai",
    {
      secretKey: process.env.THIRDWEB_SECRET_KEY
    }

  )

  const tokenBalance = await checkBalance(sdk, user.address);

  if (tokenBalance.toNumber() === 0) {
    return {
      redirect: {
        destination: "/mint",
        permanent: false
      }
    }
  }
  return {
    props: {},
  };

};
