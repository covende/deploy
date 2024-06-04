import React from 'react';
import styled from '@emotion/styled';
import { VscTable } from 'react-icons/vsc';
import { GrTicket } from 'react-icons/gr';
import { fontSize } from '@/app/assets/icons';
import { IoTicketOutline } from 'react-icons/io5';
import { BsCalculator } from 'react-icons/bs';

export const Wrapper = styled.menu`
  margin: 0;
  padding: 0;
  // max-width: 140px;
  max-width: 208px;
  grid-area: menu;

  @keyframes swing {
    0%,
    30%,
    50%,
    70%,
    100% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(10deg);
    }
    40% {
      transform: rotate(-10deg);
    }
    60% {
      transform: rotate(5deg);
    }
    80% {
      transform: rotate(-5deg);
    }
  }

  .pro-sidebar {
    color: #ffffff;
    height: calc(100vh - 80px);
    width: 270px;
    //min-width: 270px;
    //width: 140px;
    // min-width: 140px;
    // min-width: 208px;
    //min-width: 144px;
    text-align: left;
    transition: width, left, right, 0.3s;
    position: fixed;
    z-index: 1009;
  }
  .pro-sidebar > .pro-sidebar-inner {
    background: #00adf6;
    height: 100%;
    position: relative;
    z-index: 101;
  }
  .pro-sidebar > .pro-sidebar-inner > img.sidebar-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    opacity: 0.3;
    left: 0;
    top: 0;
    // z-index: 100;
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 101;

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #00adf6;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-header {
    border-bottom: 1px solid rgba(173, 173, 173, 0.2);
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-content {
    flex-grow: 1;
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-footer {
    border-top: 1px solid rgba(173, 173, 173, 0.2);
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .pro-sidebar .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
    display: none;
  }
  .pro-sidebar.collapsed {
    width: 50px;
    min-width: 50px;
  }
  .pro-sidebar.rtl {
    text-align: right;
    direction: rtl;
  }
  @media (max-width: 480px) {
    .pro-sidebar.xs {
      position: fixed;
      left: -270px;
    }
    .pro-sidebar.xs.collapsed {
      left: -80px;
    }
    .pro-sidebar.xs.toggled {
      left: 0;
    }
    .pro-sidebar.xs.toggled .overlay {
      display: block;
    }
    .pro-sidebar.xs.rtl {
      left: auto;
      right: -270px;
    }
    .pro-sidebar.xs.rtl.collapsed {
      left: auto;
      right: -80px;
    }
    .pro-sidebar.xs.rtl.toggled {
      left: auto;
      right: 0;
    }
  }
  @media (max-width: 576px) {
    .pro-sidebar.sm {
      position: fixed;
      left: -270px;
    }
    .pro-sidebar.sm.collapsed {
      left: -80px;
    }
    .pro-sidebar.sm.toggled {
      left: 0;
    }
    .pro-sidebar.sm.toggled .overlay {
      display: block;
    }
    .pro-sidebar.sm.rtl {
      left: auto;
      right: -270px;
    }
    .pro-sidebar.sm.rtl.collapsed {
      left: auto;
      right: -80px;
    }
    .pro-sidebar.sm.rtl.toggled {
      left: auto;
      right: 0;
    }
  }
  @media (max-width: 768px) {
    .pro-sidebar.md {
      position: fixed;
      left: -270px;
    }
    .pro-sidebar.md.collapsed {
      left: -80px;
    }
    .pro-sidebar.md.toggled {
      left: 0;
    }
    .pro-sidebar.md.toggled .overlay {
      display: block;
    }
    .pro-sidebar.md.rtl {
      left: auto;
      right: -270px;
    }
    .pro-sidebar.md.rtl.collapsed {
      left: auto;
      right: -80px;
    }
    .pro-sidebar.md.rtl.toggled {
      left: auto;
      right: 0;
    }
  }
  @media (max-width: 992px) {
    .pro-sidebar.lg {
      position: fixed;
      left: -270px;
    }
    .pro-sidebar.lg.collapsed {
      left: -80px;
    }
    .pro-sidebar.lg.toggled {
      left: 0;
    }
    .pro-sidebar.lg.toggled .overlay {
      display: block;
    }
    .pro-sidebar.lg.rtl {
      left: auto;
      right: -270px;
    }
    .pro-sidebar.lg.rtl.collapsed {
      left: auto;
      right: -80px;
    }
    .pro-sidebar.lg.rtl.toggled {
      left: auto;
      right: 0;
    }
  }
  @media (max-width: 1200px) {
    .pro-sidebar.xl {
      position: fixed;
      left: -270px;
    }
    .pro-sidebar.xl.collapsed {
      left: -80px;
    }
    .pro-sidebar.xl.toggled {
      left: 0;
    }
    .pro-sidebar.xl.toggled .overlay {
      display: block;
    }
    .pro-sidebar.xl.rtl {
      left: auto;
      right: -270px;
    }
    .pro-sidebar.xl.rtl.collapsed {
      left: auto;
      right: -80px;
    }
    .pro-sidebar.xl.rtl.toggled {
      left: auto;
      right: 0;
    }
  }

  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item:before {
    // content: '';
    display: inline-block;
    width: 4px;
    min-width: 4px;
    height: 4px;
    border: 1px solid transparent;
    border-radius: 50%;
    margin-right: 15px;
    position: relative;
    box-shadow: 1px 0px 0px #adadad, 0px -1px 0px #adadad, 0px 1px 0px #adadad,
      -1px 0px 0px #adadad;
  }

  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-item-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    white-space: break-spaces;
  }

  .pro-sidebar .pro-menu {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .pro-sidebar .pro-menu > ul > .pro-sub-menu > .pro-inner-list-item {
    position: relative;
    background-color: transparent;
  }
  .pro-sidebar
    .pro-menu
    > ul
    > .pro-sub-menu
    > .pro-inner-list-item
    > div
    > ul {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .pro-sidebar .pro-menu a {
    text-decoration: none;
    color: #adadad;
  }
  .pro-sidebar .pro-menu a:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
  }
  .pro-sidebar .pro-menu a:hover {
    color: #d8d8d8;
  }
  .pro-sidebar .pro-menu .pro-menu-item {
    //font-size: 0.85rem;
  }
  .pro-sidebar .pro-menu .pro-menu-item.active {
    // margin: 0px 4px;
    margin: 8px 0px 8px 4px;
    background: #fff;
    color: #ff5454;
    font-weight: bold;
    border-radius: 16px 0px 0px 16px;

    & .pro-inner-item {
      padding: 0px 4px;

      &:hover {
        color: #ff5454;
      }

      .pro-icon-wrapper .pro-icon svg path {
        fill: #ff5454;
      }
    }
  }
  .pro-sidebar .pro-menu .pro-menu-item .suffix-wrapper {
    opacity: 1;
    transition: opacity 0.2s;
  }
  .pro-sidebar .pro-menu .pro-menu-item .prefix-wrapper {
    display: flex;
    margin-right: 5px;
    opacity: 1;
    transition: opacity 0.2s;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item {
    position: relative;
    display: flex;
    align-items: center;
    // padding: 4px 35px 4px 8px;
    padding: 0px 8px;
    cursor: pointer;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:focus {
    outline: none;
    color: #ff5454;
    font-weight: bold;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
    // margin-right: 8px;
    // font-size: 14px;
    // width: 35px;
    // min-width: 35px;
    // height: 35px;
    // line-height: 35px;
    font-size: 14px;
    width: 32px;
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    display: inline-block;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper
    .pro-icon {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-item-content {
    flex-grow: 1;
    flex-shrink: 1;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:hover {
    color: #d8d8d8;
    color: #ffffff;
    text-shadow: 0px 0px 2px #ffffff;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item
    > .pro-inner-item:hover
    .pro-icon-wrapper
    .pro-icon {
    animation: swing ease-in-out 0.5s 1 alternate;
  }
  .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu > .pro-inner-item:before {
    background: #adadad;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    > .pro-inner-item
    > .pro-arrow-wrapper {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    > .pro-inner-item
    > .pro-arrow-wrapper
    .pro-arrow {
    display: inline-block;
    border-style: solid;
    border-color: #adadad;
    border-width: 0 2px 2px 0;
    padding: 2.5px;
    vertical-align: middle;
    transition: transform 0.3s;
    transform: rotate(-45deg);
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu.open
    > .pro-inner-item:before {
    background: transparent !important;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu.open
    > .pro-inner-item
    > .pro-arrow-wrapper
    .pro-arrow {
    transform: rotate(45deg);
  }
  .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item {
    // padding-left: 20px;
    background: #00000020;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item {
    padding: 8px 30px 8px 15px;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item
    > .pro-icon-wrapper {
    display: none;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item
    .pro-arrow-wrapper {
    display: none;
  }
  .pro-sidebar
    .pro-menu.shaped
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper {
    background-color: transparent;
  }
  .pro-sidebar
    .pro-menu.square
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper {
    border-radius: 0;
  }
  .pro-sidebar
    .pro-menu.round
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper {
    border-radius: 4px;
  }
  .pro-sidebar
    .pro-menu.circle
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper {
    border-radius: 50%;
  }

  .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item {
    position: relative;
    // margin-right: 10px;
    padding: 0px 4px 0px 0px;
    & .pro-item-content {
      display: none;
    }
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item
    > .pro-inner-item
    > .suffix-wrapper,
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item
    > .pro-inner-item
    > .prefix-wrapper {
    opacity: 0;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item
    > .pro-inner-list-item {
    background-color: transparent;
    z-index: 111;
  }
  .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
  }
  .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu {
    position: relative;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-item {
    pointer-events: none;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-item
    > .pro-arrow-wrapper {
    display: none;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item {
    height: auto !important;
    position: fixed;
    visibility: hidden;
    min-width: 220px;
    max-width: 270px;
    background-color: transparent;
    max-height: 100%;
    padding-left: 3px;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item.has-arrow {
    padding-left: 10px;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item
    > .popper-inner {
    max-height: 100vh;
    overflow-y: auto;
    background-color: transparent;
    padding-left: 20px;
    border-radius: 4px;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu:hover
    > .pro-inner-list-item {
    transition: visibility, transform 0.3s;
    visibility: visible;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu:hover
    .pro-icon-wrapper
    .pro-icon {
    animation: swing ease-in-out 0.5s 1 alternate;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-sub-menu-item,
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item {
    padding: 8px 30px 8px 5px;
  }

  .pro-sidebar.rtl .pro-menu .pro-menu-item .prefix-wrapper {
    margin-right: 0;
    margin-left: 5px;
  }

  .pro-sidebar.rtl .pro-menu .pro-menu-item > .pro-inner-item {
    padding: 8px 20px 8px 35px;
  }
  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper {
    margin-right: 0;
    margin-left: 10px;
  }

  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item.pro-sub-menu
    > .pro-inner-item
    > .pro-arrow-wrapper {
    right: auto;
    left: 20px;
  }
  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item.pro-sub-menu
    > .pro-inner-item
    > .pro-arrow-wrapper
    .pro-arrow {
    transform: rotate(135deg);
  }

  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item.pro-sub-menu.open
    > .pro-inner-item
    > .pro-arrow-wrapper
    .pro-arrow {
    transform: rotate(45deg);
  }

  .pro-sidebar.rtl .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item {
    padding-left: 0;
    padding-right: 20px;
  }
  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item {
    padding: 8px 15px 8px 30px;
  }
  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item:before {
    margin-right: 0;
    margin-left: 15px;
  }

  .pro-sidebar.rtl.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item {
    padding-left: 0;
    padding-right: 3px;
  }
  .pro-sidebar.rtl.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item.has-arrow {
    padding-right: 10px;
  }
  .pro-sidebar.rtl.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item
    > .popper-inner {
    padding-left: 0;
    padding-right: 20px;
  }

  .pro-sidebar.rtl.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-sub-menu-item,
  .pro-sidebar.rtl.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item {
    padding: 8px 5px 8px 30px;
  }

  .popper-arrow {
    position: absolute;
    z-index: -1;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }

  .popper-element[data-popper-placement^='left'] > .popper-arrow {
    right: 0;
    border-right: 7px solid transparent;
  }

  .popper-element[data-popper-placement^='right'] > .popper-arrow {
    left: 0;
    border-left: 7px solid transparent;
  }

  .react-slidedown {
    height: 0;
    transition-property: none;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }

  .react-slidedown.transitioning {
    overflow-y: hidden;
  }

  .react-slidedown.closed {
    display: none;
  }
`;

export const iconSidebar = {
  Clientes: (
    <svg
      width='16'
      height='20'
      viewBox='0 0 16 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.60636 9.78121C9.82999 9.78121 11.6328 7.59163 11.6328 4.89063C11.6328 2.18958 11.0409 0 7.60636 0C4.17183 0 3.57983 2.18958 3.57983 4.89063C3.57983 7.59163 5.38261 9.78121 7.60636 9.78121Z'
        fill='white'
      />
      <path
        d='M0.000791786 17.2485C0.000106079 17.0838 -0.000579628 17.2021 0.000791786 17.2485V17.2485Z'
        fill='white'
      />
      <path
        d='M15.2106 17.3774C15.2128 17.3323 15.2114 17.0646 15.2106 17.3774V17.3774Z'
        fill='white'
      />
      <path
        d='M15.2023 17.0516C15.1277 12.3464 14.5132 11.0057 9.81081 10.157C9.81081 10.157 9.14887 11.0005 7.60603 11.0005C6.06319 11.0005 5.40114 10.157 5.40114 10.157C0.75005 10.9964 0.0981716 12.3173 0.0124582 16.8987C0.00542974 17.2729 0.00217266 17.2925 0.000915527 17.2491C0.00120124 17.3305 0.00154396 17.481 0.00154396 17.7434C0.00154396 17.7434 1.12107 20.0003 7.60603 20.0003C14.0909 20.0003 15.2105 17.7434 15.2105 17.7434C15.2105 17.5748 15.2106 17.4575 15.2108 17.3778C15.2095 17.4046 15.207 17.3526 15.2023 17.0516Z'
        fill='white'
      />
    </svg>
  ),
  Pedidos: (
    <svg
      width='20'
      height='17'
      viewBox='0 0 20 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.48436 11.0617H17.0704C17.3326 11.0617 17.5625 10.8981 17.6335 10.6605L19.9774 2.91721C20.0277 2.75027 19.9932 2.57096 19.8823 2.43225C19.7712 2.29398 19.5985 2.21232 19.4142 2.21232H5.13167L4.71282 0.433246C4.65331 0.179895 4.41527 0 4.14061 0H0.585936C0.262145 0 0 0.247446 0 0.55308C0 0.858858 0.262145 1.10616 0.585936 1.10616H3.67034L5.78627 10.0937C5.16371 10.3492 4.72655 10.9341 4.72655 11.6148C4.72655 12.5297 5.51512 13.2741 6.48436 13.2741H17.0704C17.3944 13.2741 17.6564 13.0268 17.6564 12.721C17.6564 12.4153 17.3944 12.1679 17.0704 12.1679H6.48436C6.16163 12.1679 5.89842 11.92 5.89842 11.6148C5.89842 11.3096 6.16163 11.0617 6.48436 11.0617Z'
        fill='white'
      />
      <path
        d='M5.89844 14.9361C5.89844 15.8512 6.68701 16.5954 7.6564 16.5954C8.62563 16.5954 9.4142 15.8512 9.4142 14.9361C9.4142 14.0213 8.62563 13.2769 7.6564 13.2769C6.68701 13.2769 5.89844 14.0213 5.89844 14.9361Z'
        fill='white'
      />
      <path
        d='M14.1406 14.9361C14.1406 15.8512 14.9292 16.5954 15.8984 16.5954C16.8678 16.5954 17.6562 15.8512 17.6562 14.9361C17.6562 14.0213 16.8678 13.2769 15.8984 13.2769C14.9292 13.2769 14.1406 14.0213 14.1406 14.9361Z'
        fill='white'
      />
    </svg>
  ),
  'Tarifas y comisiones': (
    <svg
      width='19'
      height='20'
      viewBox='0 0 19 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.0613 12.0153C14.3476 12.0153 17.0212 9.32025 17.0212 6.00766C17.0212 2.69507 14.3476 0 11.0613 0C7.77489 0 5.1012 2.69503 5.1012 6.00762C5.1012 9.32021 7.77489 12.0153 11.0613 12.0153ZM12.7202 8.45484C12.3069 8.45484 12.0009 8.11705 11.983 7.71763C11.9651 7.31946 12.3346 6.98041 12.7202 6.98041C13.1335 6.98041 13.4395 7.3182 13.4574 7.71763C13.4753 8.11579 13.1058 8.45484 12.7202 8.45484ZM12.5423 2.45254C12.8343 2.5751 12.9717 2.91118 12.8491 3.20321L10.3363 9.19072C10.2442 9.41024 10.0314 9.5424 9.80729 9.5424C9.73332 9.5424 9.65816 9.52798 9.58563 9.49755C9.2936 9.37499 9.15624 9.03891 9.2788 8.74688L11.7916 2.75937C11.9142 2.46733 12.2503 2.33001 12.5423 2.45254ZM9.32652 5.09833C8.91322 5.09833 8.60719 4.76053 8.5893 4.36111C8.57148 3.96295 8.94089 3.62389 9.32652 3.62389C9.73981 3.62389 10.0459 3.96169 10.0638 4.36111C10.0815 4.75923 9.71214 5.09833 9.32652 5.09833Z'
        fill='white'
      />
      <path
        d='M1.88101 13.9425H0.573443C0.25675 13.9425 0 14.1993 0 14.516V19.0114C0 19.3281 0.25675 19.5848 0.573443 19.5848H1.88101V13.9425Z'
        fill='white'
      />
      <path
        d='M18.8322 13.9017C17.7574 12.8269 16.0085 12.8269 14.9338 13.9017L13.216 15.6195L12.5119 16.3236C12.2274 16.6081 11.8414 16.768 11.4389 16.768H8.01541C7.70621 16.768 7.44013 16.5304 7.42557 16.2215C7.41005 15.8917 7.6728 15.6195 7.99916 15.6195H11.479C12.1787 15.6195 12.7856 15.1214 12.9058 14.4321C12.9335 14.2739 12.9479 14.1111 12.9479 13.9451C12.9479 13.629 12.6897 13.3704 12.3737 13.3704H10.4669C9.8437 13.3704 9.24529 13.0877 8.61175 12.7883C7.94721 12.4744 7.26007 12.1498 6.4566 12.0964C5.7539 12.0496 5.04952 12.1265 4.36304 12.3247C3.628 12.537 3.09963 13.19 3.03555 13.944C3.03311 13.9438 3.03062 13.9438 3.02814 13.9436V19.5821C3.0284 19.5821 3.02867 19.5821 3.02894 19.5821V19.5848H12.9077C13.5869 19.5848 14.2256 19.3203 14.706 18.8399L18.8321 14.7138C19.0564 14.4896 19.0564 14.126 18.8322 13.9017Z'
        fill='white'
      />
    </svg>
  ),
  'Arborescencia de categorías': (
    <svg
      width='22'
      height='17'
      viewBox='0 0 22 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M21.266 6.04409L13.3145 12.0881V8.91442C7.84994 8.38989 2.60305 10.4806 0.735037 16.23C0.714494 8.83413 6.80659 4.64353 13.3145 3.22778V0L21.266 6.04409Z'
        fill='white'
      />
    </svg>
  ),
  Productos: (
    <svg
      width='17'
      height='21'
      viewBox='0 0 17 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.67843 20.3905H15.2219C15.8459 20.3905 16.3505 19.8855 16.3505 19.2619V5.64312C16.3505 5.01944 15.8459 4.5145 15.2219 4.5145H11.836V3.38587C11.836 1.51894 10.3171 0 8.45017 0C6.58324 0 5.0643 1.51894 5.0643 3.38587V4.5145H1.67843C1.05475 4.5145 0.549805 5.01944 0.549805 5.64312V19.2619C0.549805 19.8855 1.05475 20.3905 1.67843 20.3905ZM7.32155 3.38587C7.32155 2.76307 7.82855 2.25725 8.45017 2.25725C9.0718 2.25725 9.5788 2.76307 9.5788 3.38587V4.5145H7.32155V3.38587Z'
        fill='white'
      />
    </svg>
  ),
  Devoluciones: (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        // fillule='evenodd'
        // clip-rule='evenodd'
        d='M17.071 2.929C15.2613 1.11934 12.7613 0 10 0C7.23867 0 4.73867 1.11934 2.929 2.929C1.11934 4.73867 0 7.23867 0 10C0 12.7613 1.11934 15.2613 2.929 17.071C4.73867 18.8807 7.23867 20 10 20C12.7613 20 15.2613 18.8807 17.071 17.071C18.8807 15.2613 20 12.7613 20 10C20 7.23867 18.8807 4.73867 17.071 2.929ZM14.0213 13.1312C13.3535 13.7989 12.4312 14.213 11.4147 14.213H6.96343C6.43656 14.213 6.00954 13.786 6.00954 13.2591C6.00954 12.7323 6.43656 12.3052 6.96343 12.3052H11.4147C12.3944 12.3052 13.1955 11.5041 13.1955 10.5244C13.1955 9.99454 13.0301 9.56106 12.6724 9.2036C12.3497 8.88066 11.9046 8.68045 11.4147 8.68045H8.75745L9.32408 9.24608C9.69669 9.61646 9.69843 10.2189 9.32805 10.5912C8.95767 10.9638 8.35528 10.9653 7.98291 10.5949L5.79094 8.40719C5.41832 8.03681 5.41683 7.43467 5.78721 7.06205L7.97496 4.87033C8.34534 4.49796 8.94749 4.49622 9.3201 4.8666C9.69247 5.23698 9.69421 5.83913 9.32383 6.21175L8.76391 6.77266H11.4147C13.4477 6.77266 15.1033 8.42831 15.1033 10.4613C15.1033 11.52 14.7233 12.4292 14.0213 13.1312Z'
        fill='white'
      />
    </svg>
  ),
  'Centro de mensajería': (
    <svg
      width='19'
      height='18'
      viewBox='0 0 19 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.5123 3.88535C11.4635 1.74391 9.26968 0.328125 6.80888 0.328125C3.28776 0.328125 0.423131 3.1765 0.423131 6.67759C0.423131 7.62907 0.627403 8.54103 1.03058 9.39132L0.433689 12.3761C0.357714 12.7561 0.692893 13.0919 1.07292 13.0167L4.0945 12.4193C4.50134 12.6123 4.92222 12.7591 5.35467 12.8602C4.38531 8.26895 7.8654 3.9593 12.5123 3.88535Z'
        fill='white'
      />
      <path
        d='M18.3928 14.0353C18.4971 13.8154 18.5877 13.5913 18.6653 13.3635H18.6454C20.0041 9.37546 17.1467 5.18394 12.9284 4.97985C12.9284 4.97963 12.9283 4.97941 12.9282 4.9792C9.29867 4.81193 6.28314 7.71803 6.28314 11.3216C6.28314 14.8197 9.12629 17.6658 12.6233 17.6709C13.5718 17.6696 14.481 17.4654 15.3288 17.0633C18.638 17.7175 18.38 17.671 18.456 17.671C18.7999 17.671 19.0568 17.3559 18.9897 17.0201L18.3928 14.0353Z'
        fill='white'
      />
    </svg>
  ),
  FAQ: (
    <svg
      width='14'
      height='22'
      viewBox='0 0 14 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.70312 22C8.12698 22 9.28125 20.8457 9.28125 19.4219C9.28125 17.998 8.12698 16.8438 6.70312 16.8438C5.27927 16.8438 4.125 17.998 4.125 19.4219C4.125 20.8457 5.27927 22 6.70312 22Z'
        fill='white'
      />
      <path
        d='M6.70312 0C3.007 0 0 3.007 0 6.70312V7.34766H5.15625V6.70312C5.15625 5.85015 5.85015 5.15625 6.70312 5.15625C7.5561 5.15625 8.25 5.85015 8.25 6.70312C8.25 7.15765 8.0505 7.58785 7.70258 7.88352L4.125 10.9251V15.5547H9.28125V13.3092L11.0419 11.8123C12.5445 10.5356 13.4062 8.67337 13.4062 6.70312C13.4062 3.007 10.3993 0 6.70312 0V0Z'
        fill='white'
      />
    </svg>
  ),
  Estadísticas: (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.99655 6.2774H0.571891C0.257518 6.2774 0.00334439 6.53158 0 6.8493V15.4109C0 15.7287 0.257518 15.9828 0.571891 15.9828H3.99655C4.31427 15.9828 4.56844 15.7253 4.56844 15.4109V6.8493C4.56844 6.53158 4.31092 6.2774 3.99655 6.2774Z'
        fill='white'
      />
      <path
        d='M9.70541 0H6.28075C5.96638 0 5.70886 0.254174 5.70886 0.568547V15.411C5.70886 15.7287 5.96638 15.9829 6.28075 15.9829H9.70541C10.0231 15.9829 10.2773 15.7253 10.2773 15.411V0.571891C10.2773 0.254174 10.0198 0 9.70541 0Z'
        fill='white'
      />
      <path
        d='M15.4145 4.56757H11.9899C11.6721 4.56757 11.418 4.82174 11.418 5.13946V15.4134C11.418 15.7311 11.6755 15.9853 11.9899 15.9853H15.4145C15.7322 15.9853 15.9864 15.7278 15.9864 15.4134V5.13946C15.9864 4.82174 15.7289 4.56757 15.4145 4.56757Z'
        fill='white'
      />
    </svg>
  ),
  Usuarios: (
    <svg
      width='19'
      height='17'
      viewBox='0 0 19 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9.41048 6.39603C11.1767 6.39603 12.6085 4.96423 12.6085 3.19801C12.6085 1.4318 11.1767 0 9.41048 0C7.64426 0 6.21246 1.4318 6.21246 3.19801C6.21246 4.96423 7.64426 6.39603 9.41048 6.39603Z'
        fill='white'
      />
      <path
        d='M15.8795 6.39677C16.9961 6.39677 17.9013 5.49161 17.9013 4.37504C17.9013 3.25846 16.9961 2.3533 15.8795 2.3533C14.7629 2.3533 13.8578 3.25846 13.8578 4.37504C13.8578 5.49161 14.7629 6.39677 15.8795 6.39677Z'
        fill='white'
      />
      <path
        d='M2.94074 6.39677C4.05731 6.39677 4.96247 5.49161 4.96247 4.37504C4.96247 3.25846 4.05731 2.3533 2.94074 2.3533C1.82417 2.3533 0.919006 3.25846 0.919006 4.37504C0.919006 5.49161 1.82417 6.39677 2.94074 6.39677Z'
        fill='white'
      />
      <path
        d='M4.93266 8.21046C4.13683 7.55843 3.4161 7.64474 2.49592 7.64474C1.11967 7.64474 0 8.7578 0 10.1256V14.14C0 14.734 0.484848 15.2171 1.08108 15.2171C3.65515 15.2171 3.34505 15.2636 3.34505 15.106C3.34505 12.2614 3.00812 10.1753 4.93266 8.21046Z'
        fill='white'
      />
      <path
        d='M10.2852 7.66099C8.67794 7.52693 7.28092 7.66253 6.07593 8.65715C4.05945 10.2723 4.44752 12.4471 4.44752 15.1076C4.44752 15.8115 5.02022 16.3949 5.73481 16.3949C13.4939 16.3949 13.8027 16.6452 14.2628 15.6263C14.4137 15.2817 14.3724 15.3912 14.3724 12.0948C14.3724 9.47665 12.1054 7.66099 10.2852 7.66099Z'
        fill='white'
      />
      <path
        d='M16.3245 7.64465C15.3993 7.64465 14.6825 7.55922 13.8878 8.21037C15.7979 10.1606 15.4754 12.1044 15.4754 15.1059C15.4754 15.2645 15.2179 15.217 17.7007 15.217C18.3183 15.217 18.8204 14.7167 18.8204 14.1017V10.1255C18.8204 8.75771 17.7007 7.64465 16.3245 7.64465Z'
        fill='white'
      />
    </svg>
  ),
  Roles: (
    <svg
      width='20'
      height='22'
      viewBox='0 0 20 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.017 0C6.52807 0 2.87752 3.65056 2.87752 8.13948V9.33598L0.914547 13.2619C0.808734 13.4722 0.820943 13.7218 0.944392 13.9212C1.06784 14.1206 1.28625 14.2441 1.52094 14.2441H2.87752V17.5107C2.87752 17.9096 3.05116 18.2853 3.35639 18.5431C3.66162 18.8008 4.05774 18.9134 4.45386 18.847L6.94726 18.4346V21.027C6.94726 21.2264 7.03408 21.4163 7.18737 21.5438C7.31082 21.6483 7.46547 21.7053 7.62555 21.7053C7.66218 21.7053 7.70016 21.7026 7.73679 21.6958L15.8763 20.3392C16.2032 20.2849 16.4433 20.0028 16.4433 19.6704V15.4908C16.4433 14.5466 16.9073 13.7896 17.2966 13.3189C18.4958 11.8701 19.1565 10.0306 19.1565 8.13948C19.1565 3.65056 15.5059 0 11.017 0Z'
        fill='white'
      />
    </svg>
  ),
  Logs: (
    <svg
      width='23'
      height='23'
      viewBox='0 0 23 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.1389 7.91765C11.9561 7.36754 11.0439 7.36754 10.8611 7.91765L9.51344 11.9606C9.49045 12.0298 9.47852 12.1015 9.47852 12.1738H13.5215C13.5215 12.1015 13.5096 12.0298 13.4866 11.9606L12.1389 7.91765Z'
        fill='white'
      />
      <path
        d='M9.47852 16.4897C10.1039 16.7439 10.7844 16.8906 11.5 16.8906C12.2156 16.8906 12.8961 16.7439 13.5215 16.4897V13.5215H9.47852V16.4897Z'
        fill='white'
      />
      <path
        d='M22.5394 9.51344L20.5479 8.86382C20.3559 8.20526 20.092 7.57021 19.7604 6.96815L20.679 5.13092C20.8087 4.87157 20.7579 4.55834 20.5526 4.35303L18.647 2.44736C18.4417 2.24206 18.1297 2.19205 17.8691 2.32102L16.0318 3.23964C15.4298 2.90799 14.7947 2.64407 14.1362 2.4521L13.4866 0.460625C13.3951 0.185654 13.1379 0 12.8477 0H10.1523C9.86211 0 9.60486 0.185654 9.51344 0.460625L8.86382 2.4521C8.20526 2.64407 7.57021 2.90799 6.96815 3.23964L5.13092 2.32102C4.87104 2.19012 4.55904 2.24083 4.35303 2.44736L2.44736 4.35303C2.24206 4.55834 2.19135 4.87157 2.32102 5.13092L3.23964 6.96798C2.90799 7.57021 2.64407 8.20509 2.45193 8.86382L0.460625 9.51326C0.185654 9.60486 0 9.86211 0 10.1523V12.8477C0 13.1379 0.185654 13.3951 0.460625 13.4866L2.4521 14.1362C2.64407 14.7947 2.90799 15.4298 3.23964 16.0318L2.32102 17.8691C2.19135 18.1284 2.24206 18.4417 2.44736 18.647L4.35303 20.5526C4.55975 20.7592 4.87297 20.8099 5.13092 20.679L6.96815 19.7604C7.57021 20.092 8.20526 20.3559 8.86382 20.5479L9.51344 22.5394C9.60486 22.8143 9.86211 23 10.1523 23H12.8477C13.1379 23 13.3951 22.8143 13.4866 22.5394L14.1362 20.5479C14.7947 20.3559 15.4298 20.092 16.0318 19.7604L17.8691 20.679C18.1277 20.808 18.441 20.7579 18.647 20.5526L20.5526 18.647C20.7579 18.4417 20.8085 18.1284 20.679 17.8691L19.7604 16.0318C20.092 15.4298 20.3559 14.7947 20.5479 14.1362L22.5394 13.4866C22.8143 13.3951 23 13.1379 23 12.8477V10.1523C23 9.86211 22.8143 9.60486 22.5394 9.51344ZM11.5 18.2383C7.78482 18.2383 4.76172 15.2152 4.76172 11.5C4.76172 7.78482 7.78482 4.76172 11.5 4.76172C15.2152 4.76172 18.2383 7.78482 18.2383 11.5C18.2383 15.2152 15.2152 18.2383 11.5 18.2383Z'
        fill='white'
      />
    </svg>
  ),
  'Centro de facturación': (
    <svg
      width='17'
      height='23'
      viewBox='0 0 17 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16.4453 0.573825C16.1057 0.417395 15.7057 0.478267 15.428 0.728514L13.9626 2.02594C13.9228 2.06142 13.8626 2.06121 13.823 2.02552L11.8293 0.242328C11.4687 -0.0807758 10.9228 -0.0807758 10.5622 0.242328L8.57024 2.02388C8.53017 2.05968 8.46961 2.05968 8.42954 2.02388L6.43739 0.242328C6.0768 -0.0807231 5.5309 -0.0807231 5.17032 0.242328L3.17631 2.02552C3.1364 2.06121 3.07611 2.06137 3.03599 2.02589L1.56935 0.728514C1.18025 0.382497 0.584307 0.417395 0.23829 0.806492C0.0831268 0.980978 -0.00176712 1.20683 2.78946e-05 1.44029V20.8948C-0.00345655 21.4163 0.416472 21.8419 0.937978 21.8454C1.17159 21.847 1.39745 21.7619 1.57199 21.6066L3.03731 20.3092C3.07717 20.2737 3.1373 20.2739 3.17695 20.3096L5.17069 22.0928C5.53127 22.4159 6.07717 22.4159 6.43776 22.0928L8.42991 20.3112C8.46999 20.2754 8.53054 20.2754 8.57061 20.3112L10.5628 22.0927C10.9234 22.4157 11.4693 22.4157 11.8298 22.0927L13.8239 20.3095C13.8639 20.2738 13.9242 20.2737 13.9643 20.3092L15.4309 21.6065C15.8202 21.9524 16.4161 21.9172 16.7619 21.528C16.9168 21.3537 17.0016 21.1281 16.9999 20.8948V1.44029C17.0049 1.06656 16.7867 0.725769 16.4453 0.573825ZM3.49541 7.57752H8.75302C8.98627 7.57752 9.17537 7.76663 9.17537 7.99987C9.17537 8.23312 8.98627 8.42223 8.75302 8.42223H3.49541C3.26216 8.42223 3.07305 8.23312 3.07305 7.99987C3.07305 7.76663 3.26216 7.57752 3.49541 7.57752ZM13.5045 14.7576H3.49541C3.26216 14.7576 3.07305 14.5685 3.07305 14.3352C3.07305 14.102 3.26216 13.9129 3.49541 13.9129H13.5045C13.7378 13.9129 13.9269 14.102 13.9269 14.3352C13.9269 14.5685 13.7378 14.7576 13.5045 14.7576ZM13.5045 11.5899H3.49541C3.26216 11.5899 3.07305 11.4008 3.07305 11.1676C3.07305 10.9343 3.26216 10.7452 3.49541 10.7452H13.5045C13.7378 10.7452 13.9269 10.9343 13.9269 11.1676C13.9269 11.4008 13.7378 11.5899 13.5045 11.5899Z'
        fill='white'
      />
    </svg>
  ),
  Subastas: (
    <svg
      width='20'
      height='19'
      viewBox='0 0 20 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10.2835 10.2807C9.88497 10.7055 9.55075 11.1863 9.2915 11.7079L16.3321 18.7485C16.4925 18.9088 16.71 18.9989 16.9368 18.9989C17.1636 18.9989 17.3811 18.9088 17.5416 18.7485L18.7513 17.5387C18.8307 17.4593 18.8937 17.365 18.9367 17.2612C18.9797 17.1575 19.0018 17.0462 19.0018 16.9339C19.0018 16.8216 18.9797 16.7103 18.9367 16.6065C18.8937 16.5028 18.8307 16.4085 18.7513 16.329L11.7107 9.29041C11.1882 9.54738 10.7071 9.88119 10.2835 10.2807Z'
        fill='white'
      />
      <path
        d='M6.04902 6.04695C5.40217 6.64724 4.65339 7.12729 3.83789 7.46451L8.25887 11.8855C8.59912 11.0714 9.07965 10.3234 9.67857 9.67543C10.3255 9.07516 11.0743 8.59506 11.8897 8.25765L7.46851 3.83752C7.12814 4.65132 6.64771 5.39911 6.04902 6.04695Z'
        fill='white'
      />
      <path
        d='M9.07224 0.604765L7.86274 1.81426C7.52875 2.14825 7.52875 2.68976 7.86274 3.02375L12.7007 7.86173C13.0347 8.19572 13.5762 8.19572 13.9102 7.86173L15.1197 6.65224C15.4537 6.31824 15.4537 5.77673 15.1197 5.44274L10.2817 0.604765C9.94774 0.270773 9.40623 0.270773 9.07224 0.604765Z'
        fill='white'
      />
      <path
        d='M1.81424 7.86276L0.604747 9.07225C0.270754 9.40625 0.270754 9.94776 0.604747 10.2817L5.44272 15.1197C5.77672 15.4537 6.31822 15.4537 6.65222 15.1197L7.86171 13.9102C8.1957 13.5762 8.1957 13.0347 7.86171 12.7007L3.02373 7.86276C2.68974 7.52877 2.14823 7.52877 1.81424 7.86276Z'
        fill='white'
      />
    </svg>
  ),
  'Edición Web Pública': (
    <svg
      width='23'
      height='20'
      viewBox='0 0 23 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M20.8658 0H1.2987C0.582685 0 0 0.582685 0 1.2987V14.1992C0 14.9152 0.582685 15.4979 1.2987 15.4979H20.8658C21.5819 15.4979 22.1646 14.9152 22.1646 14.1992V1.2987C22.1646 0.582685 21.5819 0 20.8658 0Z'
        fill='white'
      />
      <path
        d='M18.0087 18.7013H14.5022V16.7966H7.66238V18.7013H4.15588C3.79744 18.7013 3.50653 18.9922 3.50653 19.3507C3.50653 19.7091 3.79744 20 4.15588 20H18.0087C18.3672 20 18.6581 19.7091 18.6581 19.3507C18.6581 18.9922 18.3672 18.7013 18.0087 18.7013Z'
        fill='white'
      />
    </svg>
  ),
  'Servicios adicionales': (
    <svg
      width='21'
      height='19'
      viewBox='0 0 21 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5.14823 13.4597L5.11189 13.4575C4.82661 13.4402 4.55149 13.3878 4.29023 13.3056L2.46423 16.4673C2.29694 16.7569 2.39872 17.1274 2.69048 17.291L4.4879 18.2991C4.77462 18.4599 5.13743 18.3603 5.3018 18.0757L7.96771 13.4597H5.14823Z'
        fill='white'
      />
      <path
        d='M15.2882 0.0893235L9.86401 3.41008V12.9731L15.295 16.1995C15.6953 16.4373 16.2024 16.1489 16.2024 15.6834V0.601293C16.2024 0.132188 15.6883 -0.155655 15.2882 0.0893235Z'
        fill='white'
      />
      <path
        d='M1.9423 10.1463V6.11355C1.9423 5.88246 1.96731 5.65733 2.01362 5.44012H1.14049C0.510609 5.44012 0 5.95057 0 6.58025V9.67956C0 10.3092 0.510609 10.8197 1.14049 10.8197H2.0133C1.96715 10.6019 1.9423 10.3768 1.9423 10.1463Z'
        fill='white'
      />
      <path
        d='M8.66336 12.2558H5.18507C4.05763 12.1875 3.14368 11.2738 3.14368 10.1467V6.11405C3.14368 4.98697 4.05763 4.07333 5.18507 4.14173H8.66336V12.2558Z'
        fill='white'
      />
      <path
        d='M18.8393 13.0439C18.6856 13.0439 18.532 12.9852 18.4147 12.868L17.2032 11.657C16.9687 11.4225 16.9687 11.0424 17.2032 10.808C17.4377 10.5735 17.818 10.5735 18.0525 10.808L19.264 12.019C19.4985 12.2534 19.4985 12.6335 19.264 12.868C19.1467 12.9852 18.993 13.0439 18.8393 13.0439Z'
        fill='white'
      />
      <path
        d='M17.6279 5.83991C17.4742 5.83991 17.3205 5.78131 17.2032 5.66405C16.9687 5.42963 16.9687 5.0495 17.2032 4.81505L18.4147 3.604C18.6492 3.36955 19.0294 3.36955 19.264 3.604C19.4985 3.83841 19.4985 4.21855 19.264 4.453L18.0525 5.66405C17.9353 5.78127 17.7816 5.83991 17.6279 5.83991Z'
        fill='white'
      />
      <path
        d='M19.8915 8.83886H18.1783C17.8466 8.83886 17.5778 8.57007 17.5778 8.23852C17.5778 7.90698 17.8466 7.63818 18.1783 7.63818H19.8915C20.2232 7.63818 20.4921 7.90698 20.4921 8.23852C20.4921 8.57007 20.2232 8.83886 19.8915 8.83886Z'
        fill='white'
      />
    </svg>
  ),
  'Cartera de clientes': (
    <svg
      width='22'
      height='23'
      viewBox='0 0 22 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.6459 -0.000244141C10.2239 -0.000244141 9.02454 1.19908 9.02454 2.62109C9.02454 4.0431 10.2239 5.24243 11.6459 5.24243C13.0679 5.24243 14.2242 4.0431 14.2242 2.62109C14.2242 1.19908 13.0679 -0.000244141 11.6459 -0.000244141Z'
        fill='white'
      />
      <path
        d='M14.5074 5.24243C13.799 6.02793 12.7844 6.53161 11.6457 6.53161C10.5071 6.53161 9.44954 6.02793 8.74113 5.24243C8.12267 5.92823 7.73523 6.82666 7.73523 7.82079V8.46539C7.73523 8.82167 8.02353 9.10998 8.37982 9.10998H14.8687C15.225 9.10998 15.5133 8.82167 15.5133 8.46539V7.82079C15.5133 6.82666 15.1258 5.92823 14.5074 5.24243Z'
        fill='white'
      />
      <path
        d='M6.22767 19.7846L2.9428 13.1988C2.62561 12.5629 1.85365 12.3035 1.21693 12.619L0.358375 13.0443C0.0387006 13.2028 -0.0913778 13.5914 0.0681799 13.9105L3.93572 21.6456C4.09477 21.9645 4.48165 22.0915 4.79874 21.9351L5.64625 21.5152C6.28547 21.1986 6.54602 20.423 6.22767 19.7846Z'
        fill='white'
      />
      <path
        d='M21.4737 10.6441C20.9451 10.2573 20.2103 10.3347 19.772 10.8117L16.2482 15.1433C16.0033 15.4012 15.5392 15.5559 15.2942 15.5559H12.2904C11.9294 15.5559 11.6458 15.2723 11.6458 14.9113C11.6458 14.5503 11.9294 14.2667 12.2904 14.2667C13.1537 14.2667 14.1095 14.2667 14.8688 14.2667C15.5778 14.2667 16.1579 13.6866 16.1579 12.9775C16.1579 12.2685 15.5778 11.6883 14.8688 11.6883C11.8415 11.6883 14.7291 11.6883 11.4911 11.6883C11.1698 11.6883 11.0096 11.4846 10.7563 11.2628C9.75892 10.3654 8.26605 9.93297 6.7547 10.2833C5.91553 10.4778 5.34962 10.8168 4.77568 11.2714L4.75655 11.2558L3.82422 12.0764L7.48824 19.4234H8.57322H14.8688C16.0806 19.4234 17.2409 18.8433 17.9628 17.8764L21.7444 12.4618C22.1698 11.8945 22.0538 11.0696 21.4737 10.6441Z'
        fill='white'
      />
    </svg>
  ),
  'Datos de Covende': (
    <svg
      width='26'
      height='15'
      viewBox='0 0 26 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <rect
        y='0.00189209'
        width='26'
        height='14.8436'
        rx='2.07273'
        fill='white'
      />
      <rect
        x='4.82227'
        y='2.74371'
        width='4.16'
        height='4.25455'
        rx='2.08'
        fill='#00ADF6'
      />
      <path
        d='M3.49805 11.111C3.49805 9.25733 5.00074 7.75464 6.85441 7.75464C8.70808 7.75464 10.2108 9.25733 10.2108 11.111V12.0092H3.49805V11.111Z'
        fill='#00ADF6'
      />
      <rect
        x='12.3848'
        y='4.06738'
        width='10.0218'
        height='1.60727'
        rx='0.803636'
        fill='#00ADF6'
      />
      <rect
        x='12.3848'
        y='6.80914'
        width='10.0218'
        height='1.60727'
        rx='0.803636'
        fill='#00ADF6'
      />
      <rect
        x='12.3848'
        y='9.55096'
        width='10.0218'
        height='1.70182'
        rx='0.850909'
        fill='#00ADF6'
      />
    </svg>
  ),
  Tablas: <VscTable style={{ fontSize: fontSize }} />,
  Cupones: <IoTicketOutline style={{ fontSize: fontSize }} />,
  Reembolso: (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13.9067 22.0001C13.8738 21.9848 13.8421 21.9678 13.808 21.9548C13.3809 21.7939 13.1364 21.3885 13.2146 20.9695C13.2512 20.7616 13.3613 20.5738 13.5248 20.4402C13.6882 20.3066 13.8942 20.2361 14.1053 20.2416C15.5564 20.2387 17.0076 20.2416 18.4582 20.2387C18.8464 20.244 19.2253 20.1204 19.5357 19.8872C19.846 19.654 20.0702 19.3245 20.1732 18.9502C20.4711 17.8927 19.7155 16.7875 18.6192 16.7335C17.8384 16.6947 17.0535 16.7258 16.2192 16.7258C16.3185 16.8287 16.3954 16.9021 16.463 16.9785C16.8079 17.3521 16.8067 17.8809 16.463 18.2246C16.1193 18.5683 15.5817 18.573 15.2186 18.2164C14.6311 17.6426 14.0506 17.0621 13.4772 16.475C13.103 16.0925 13.1077 15.5825 13.4848 15.1994C14.0551 14.619 14.6305 14.0436 15.211 13.4733C15.5823 13.1084 16.1234 13.1119 16.4712 13.4662C16.819 13.8205 16.8079 14.3369 16.4571 14.7118C16.3925 14.7811 16.3161 14.8393 16.1986 14.9439C16.3161 14.9527 16.3749 14.9609 16.4336 14.9609C17.1081 14.9609 17.7849 14.9609 18.4565 14.9609C20.2419 14.9679 21.6878 16.2147 21.9616 17.9843C21.9706 18.0187 21.9832 18.0519 21.9992 18.0836V18.8756C21.9826 18.9146 21.9692 18.9549 21.9593 18.996C21.8566 19.6829 21.5532 20.3242 21.0874 20.8393C20.6215 21.3544 20.0138 21.7204 19.3407 21.8914C19.1873 21.9307 19.0316 21.9631 18.8765 21.9989L13.9067 22.0001Z'
        fill='#FF5454'
      />
      <path
        d='M9.4396 18.8052C7.26398 18.8067 5.15474 18.058 3.46931 16.6858C1.78387 15.3137 0.625899 13.4025 0.191621 11.2762C-0.724191 6.85868 1.71759 2.33492 5.91544 0.677043C11.0417 -1.34677 16.7335 1.32729 18.4145 6.55725C18.9085 8.09238 18.9795 9.65834 18.675 11.2386C18.5811 11.7278 18.1318 12.0424 17.6716 11.9499C17.1851 11.8517 16.8995 11.4133 16.9928 10.908C17.6893 7.14755 15.6877 3.5435 12.1527 2.20019C7.66579 0.494357 2.67118 3.3317 1.84065 8.06155C1.48939 10.0447 1.9315 12.0861 3.07211 13.7478C4.21273 15.4095 5.96096 16.5591 7.94167 16.9498C8.93868 17.149 9.9657 17.1461 10.9616 16.9412C11.6267 16.8071 12.1309 17.1987 12.096 17.8181C12.0897 18.0054 12.0182 18.1847 11.894 18.3253C11.7698 18.4659 11.6004 18.559 11.4149 18.5888C10.7618 18.6956 10.103 18.7692 9.44647 18.8571L9.4396 18.8052Z'
        fill='#FF5454'
      />
      <path
        d='M7.18425 12.7132C6.77358 12.7132 6.40558 12.6466 6.08025 12.5132C5.75492 12.3799 5.49358 12.1826 5.29625 11.9212C5.10425 11.6599 5.00292 11.3452 4.99225 10.9772H6.44825C6.46958 11.1852 6.54158 11.3452 6.66425 11.4572C6.78692 11.5639 6.94692 11.6172 7.14425 11.6172C7.34692 11.6172 7.50692 11.5719 7.62425 11.4812C7.74158 11.3852 7.80025 11.2546 7.80025 11.0892C7.80025 10.9506 7.75225 10.8359 7.65625 10.7452C7.56558 10.6546 7.45092 10.5799 7.31225 10.5212C7.17892 10.4626 6.98692 10.3959 6.73625 10.3212C6.37358 10.2092 6.07758 10.0972 5.84825 9.98523C5.61892 9.87323 5.42158 9.70789 5.25625 9.48923C5.09092 9.27056 5.00825 8.98523 5.00825 8.63323C5.00825 8.11056 5.19758 7.70256 5.57625 7.40923C5.95492 7.11056 6.44825 6.96123 7.05625 6.96123C7.67492 6.96123 8.17358 7.11056 8.55225 7.40923C8.93092 7.70256 9.13358 8.11323 9.16025 8.64123H7.68025C7.66958 8.45989 7.60292 8.31856 7.48025 8.21723C7.35758 8.11056 7.20025 8.05723 7.00825 8.05723C6.84292 8.05723 6.70958 8.10256 6.60825 8.19323C6.50692 8.27856 6.45625 8.40389 6.45625 8.56923C6.45625 8.75056 6.54158 8.89189 6.71225 8.99323C6.88292 9.09456 7.14958 9.20389 7.51225 9.32123C7.87492 9.44389 8.16825 9.56123 8.39225 9.67323C8.62158 9.78523 8.81892 9.94789 8.98425 10.1612C9.14958 10.3746 9.23225 10.6492 9.23225 10.9852C9.23225 11.3052 9.14958 11.5959 8.98425 11.8572C8.82425 12.1186 8.58958 12.3266 8.28025 12.4812C7.97092 12.6359 7.60558 12.7132 7.18425 12.7132ZM13.1221 5.05723L10.9781 14.1532H9.65813L11.8021 5.05723H13.1221Z'
        fill='#FF5454'
      />
    </svg>
  ),
  'Ingresos y Egresos': <BsCalculator style={{ fontSize: fontSize }} />
};
