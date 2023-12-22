// import React from 'react';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-neutral text-neutral-content">
                <aside>
                    <h2 className="text-xl font-bold uppercase text-white">Task <br /> <span className="ml-5 text-gray-400">Sphere</span></h2>
                    <p>Copyright © 2023 - All right reserved by Task Sphere</p>
                </aside>
                <nav>
                    <header className="footer-title">Social</header>
                    <div className="grid grid-flow-col gap-4">
                        <a href="https://www.facebook.com/profile.php?id=100056107479254" className="text-3xl hover:text-gray-400 cursor-pointer btn  btn-xs text-white bg-transparent border-none hover:bg-transparent hover:border-none"><FaSquareFacebook></FaSquareFacebook></a>
                        <a href="https://www.linkedin.com/in/junayet-alam/" className="text-3xl hover:text-gray-400 cursor-pointer btn  btn-xs text-white bg-transparent border-none hover:bg-transparent hover:border-none"><FaLinkedin></FaLinkedin></a>
                        <a href="https://github.com/junayet4o12" className="text-3xl hover:text-gray-400 cursor-pointer btn  btn-xs text-white bg-transparent border-none hover:bg-transparent hover:border-none"><FaGithubSquare></FaGithubSquare></a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;