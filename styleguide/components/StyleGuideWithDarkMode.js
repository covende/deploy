/**
 * Copy of rsg-components/StyleguideRenderer, with addition of ThemeSwitcher component to toggle
 * theme from UI
 */

import React, { useState } from 'react';
import { bool, node, shape, string } from 'prop-types';
import cx from 'clsx';

import Context, { useStyleGuideContext } from 'rsg-components/Context';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import Ribbon from 'rsg-components/Ribbon';
import Version from 'rsg-components/Version';

import ThemeSwitcher from './ThemeSwitcher';

const propTypes = {
  children: node.isRequired,
  classes: shape().isRequired,
  homepageUrl: string.isRequired,
  title: string.isRequired,
  toc: node.isRequired,
  hasSidebar: bool,
  version: string,
};

const styles = ({
  color,
  fontFamily,
  fontSize,
  sidebarWidth,
  mq,
  space,
  maxWidth,
}) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: color.baseBackground,
  },
  hasSidebar: {
    paddingLeft: sidebarWidth,
    [mq.small]: {
      paddingLeft: 0,
    },
  },
  content: {
    maxWidth,
    padding: [[space[2], space[4]]],
    margin: [[0, 'auto']],
    [mq.small]: {
      padding: space[2],
    },
    display: 'block',
  },
  sidebar: {
    backgroundColor: color.sidebarBackground,
    border: [[color.border, 'solid']],
    borderWidth: [[0, 1, 0, 0]],
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: sidebarWidth,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    [mq.small]: {
      position: 'static',
      width: 'auto',
      borderWidth: [[1, 0, 0, 0]],
      paddingBottom: space[0],
    },
  },
  sidebarSection: {
    padding: space[2],
    borderBottom: [[1, color.border, 'solid']],
  },
  footer: {
    display: 'block',
    color: color.light,
    fontFamily: fontFamily.base,
    fontSize: fontSize.small,
  },
});

export function StyleGuideRenderer({
  children,
  classes,
  hasSidebar,
  homepageUrl,
  title,
  toc,
  version,
}) {
  const {
    codeRevision,
    config,
    slots,
    displayMode,
    cssRevision,
  } = useStyleGuideContext();
  const [brand, setBrand] = useState('brand1');

  return (
    <Context.Provider
      value={{
        brand,
        setBrand,
        codeRevision,
        config,
        slots,
        displayMode,
        cssRevision,
      }}>
      <div className={cx(classes.root, hasSidebar && classes.hasSidebar)}>
        <main className={classes.content}>
          {children}
          <footer className={classes.footer}>
            <Markdown
              text={`Created with [React Styleguidist](${homepageUrl})`}
            />
          </footer>
        </main>
        {hasSidebar && (
          <div className={classes.sidebar} data-testid='sidebar'>
            <header className={classes.sidebarSection}>
              <Logo>{title}</Logo>
              {version && <Version>{version}</Version>}
            </header>
            <section className={classes.sidebarSection}>
              <ThemeSwitcher classes={classes} />
            </section>
            {toc}
          </div>
        )}
        <Ribbon />
      </div>
    </Context.Provider>
  );
}

StyleGuideRenderer.propTypes = propTypes;

export default Styled(styles)(StyleGuideRenderer);
