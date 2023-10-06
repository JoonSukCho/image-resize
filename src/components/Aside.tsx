import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FcFile, FcViewDetails, FcSettings } from 'react-icons/fc';

const MenuList = [
  {
    id: 'single',
    icon: FcFile,
    name: 'SINGLE',
    pathname: '/',
  },
  {
    id: 'multi',
    icon: FcViewDetails,
    name: 'MULTI',
    pathname: '/multi',
  },
];

const Aside = () => {
  const router = useRouter();

  return (
    <Container>
      <Header>
        <BrandLink href="/">
          <FcSettings size={30} />
          <span className="brandText">CONVERTER</span>
        </BrandLink>
      </Header>
      <Hr />
      <MenuWrapper>
        <ul className="menuList">
          {MenuList.map((menuListItem) => (
            <li key={menuListItem.name}>
              <MenuListItemLink
                href={menuListItem.pathname}
                isActive={router.asPath === menuListItem.pathname}
              >
                <div className="menuIcon">
                  <menuListItem.icon size={24} />
                </div>
                <span className="menuText">{menuListItem.name}</span>
              </MenuListItemLink>
            </li>
          ))}
        </ul>
      </MenuWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;

  background-color: #ffffff;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);

  width: 100%;
  max-width: 15.625rem !important;
  overflow-y: auto;
  padding: 0;
  box-shadow: none;
  z-index: 9999;
  border-radius: 1rem;

  margin: 1rem 0 1rem 1.5rem;
`;

const Header = styled.div`
  height: 4.875rem;
`;

const BrandLink = styled.a`
  display: flex;
  align-items: center;

  padding: 1.5rem 2rem;
  color: ${({ theme }) => theme.color.secondary};
  text-align: center;

  & .brandText {
    font-weight: 600;
    margin-left: 1rem;
  }
`;

const Hr = styled.hr`
  background-image: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.4),
    transparent
  );
  margin: 0 0 1rem 0;
  border: 0;
  height: 1px;
  opacity: 0.25;
`;

const MenuWrapper = styled.div`
  & .menuList {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin: 0;
    list-style: none;
  }

  & .menuListItem {
    width: 100%;
    margin-top: 0.125rem;
    list-style: none;
  }
`;

const MenuListItemLink = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.675rem 1rem;
  margin: 0 0.5rem;
  border-radius: 0.5rem;

  font-size: 0.875rem;
  white-space: nowrap;

  background-color: ${({ isActive }) => (isActive ? '#f6f9fc' : 'transparent')};

  & .menuIcon {
    padding: 10px;
    margin-right: 0.5rem;
  }

  & .menuText {
    font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
  }
`;

export default Aside;
