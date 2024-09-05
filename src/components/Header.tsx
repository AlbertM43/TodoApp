import style from "./Header.module.css";

import rocketLogo from "../assets/rocket-logo.svg";

export function Header() {
    return (
        <header className={style.headerBox}>
            <img src={rocketLogo} alt="rocket-logo" />
            <h1 className={style.logoName}>todo</h1>
        </header>
    )
}