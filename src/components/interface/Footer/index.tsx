import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 flex items-center justify-center p-5">
      <ul className="text-white flex gap-4">
        <li className="flex items-center">
          <Github className="mr-2 h-4 w-4" color="#fff" />
          <a href="https://github.com/piazin" target="_blank" rel="external">
            piazin
          </a>
        </li>

        <li className="flex items-center">
          <Linkedin className="mr-2 h-4 w-4" color="#fff" />
          <a
            href="https://www.linkedin.com/in/lucas-souza-929096222/"
            target="_blank"
            rel="external"
          >
            lucas souza
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
