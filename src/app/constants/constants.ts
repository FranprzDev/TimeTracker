import {
  FaBook,
  FaCat,
  FaDollarSign,
  FaFacebook,
  FaFeather,
  FaFeatherAlt,
  FaInstagram,
  FaLinkedin,
  FaMagento,
  FaRadiation,
  FaSnowboarding,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { RiLeafLine } from "react-icons/ri";
import { SiMyanimelist } from "react-icons/si";
import { Entry, Person, SocialNetwork } from "../types/types";

export const people: Person[] = [
  { name: "Florencia Perez", icon: RiLeafLine },
  { name: "Gonzalo Posse", icon: FaDollarSign },
  { name: "Francisco Perez", icon: FaSnowboarding },
  { name: "Manuel Parada", icon: FaFeatherAlt },
  { name: "Felicitas Rallé", icon: FaCat },
  { name: "Jimena Cossio", icon: FaMagento },
  { name: "Agus Bitrán", icon: FaRadiation },
];

export const socialNetworks: SocialNetwork[] = [
  { name: "WhatsApp", icon: FaWhatsapp },
  { name: "Instagram Reels", icon: FaInstagram },
  { name: "TikTok", icon: FaTiktok },
  { name: "Facebook Shorts", icon: FaFacebook },
  { name: "Anime", icon: SiMyanimelist },
  { name: "YouTube Shorts", icon: FaYoutube },
  { name: "Twitter", icon: FaTwitter },
  { name: "LinkedIn", icon: FaLinkedin },
  { name: "Manga", icon: FaBook },
];

export const exampleEntries: Entry[] = [
]