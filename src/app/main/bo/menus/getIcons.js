import React from 'react';
import { ImUsers } from 'react-icons/im';
import {
  MdBorderColor,
  MdCategory,
  MdAssignmentInd,
  MdAccountBalanceWallet,
  MdOutlineWeb
} from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import {
  BsFillCartPlusFill,
  BsQuestionSquareFill,
  BsCart3,
  BsListTask
} from 'react-icons/bs';
import { BiMessageAltDetail, BiBookAdd, BiCog } from 'react-icons/bi';
import { AiOutlineBarChart, AiFillDatabase } from 'react-icons/ai';
import { GrUserAdmin } from 'react-icons/gr';
import { RiAuctionFill, RiServiceFill } from 'react-icons/ri';
import { GiWallet, GiReturnArrow, GiHouse } from 'react-icons/gi';
import { IoIosSync } from 'react-icons/io';
import { CgVolume } from 'react-icons/cg';

export const getIcons = (title) => {
  switch (title) {
    case 'users':
      return <ImUsers />;
    case 'order':
      return <MdBorderColor />;
    case 'rates':
      return <FaFileInvoiceDollar />;
    case 'arborescence':
      return <MdCategory />;
    case 'car':
      return <BsFillCartPlusFill />;
    case 'devolution':
      return <GiReturnArrow />;
    case 'message':
      return <BiMessageAltDetail />;
    case 'questions':
      return <BsQuestionSquareFill />;
    case 'statistics':
      return <AiOutlineBarChart />;
    case 'admin':
      return <GrUserAdmin />;
    case 'menu':
      return <BiBookAdd />;
    case 'addUser':
      return <MdAssignmentInd />;
    case 'invoice':
      return <MdAccountBalanceWallet />;
    case 'auction':
      return <RiAuctionFill />;
    case 'publicWeb':
      return <MdOutlineWeb />;
    case 'services':
      return <RiServiceFill />;
    case 'data':
      return <AiFillDatabase />;
    case 'walletClient':
      return <GiWallet />;
    case 'home':
      return <GiHouse />;
    case 'orders':
      return <BsCart3 />;
    case 'devolutions':
      return <IoIosSync />;
    case 'auctions':
      return <CgVolume />;
    case 'list':
      return <BsListTask />;
    case 'configuration':
      return <BiCog />;
    default:
      return <ImUsers />;
  }
};
