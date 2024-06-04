import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import React from 'react';
import { BiLockOpen } from 'react-icons/bi';
import {
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
  BsPencilSquare,
  BsPlus,
  BsPlusCircle,
  BsTrash
} from 'react-icons/bs';
import { GiPencil } from 'react-icons/gi';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { RiEyeLine } from 'react-icons/ri';

export const fontSize = '1.5rem';
export const color = COLORS['red'];

export const Eye = <RiEyeLine style={{ fontSize }} />;
export const Pencil = <GiPencil style={{ fontSize }} />;
export const PencilAltIcon = (
  <BsPencilSquare style={{ fontSize, color: COLORS['blue'] }} />
);
export const Trash = <BsTrash style={{ color, fontSize }} />;
export const lockOpen = <BiLockOpen style={{ color, fontSize }} />;
export const plusCircle = <BsPlusCircle style={{ fontSize }} />;
export const plus = <BsPlus style={{ fontSize }} />;
export const litlePlus = <BsPlus style={{ fontSize }} />;
export const informationCircle = (
  <IoInformationCircleOutline style={{ fontSize }} />
);
export const chevbronUp = <BsChevronUp style={{ fontSize }} />;
export const chevbronDown = <BsChevronDown style={{ fontSize }} />;
export const chevbronLeft = <BsChevronLeft style={{ fontSize }} />;
export const chevbronRight = <BsChevronRight style={{ fontSize }} />;
