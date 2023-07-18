import React from "react";
import { StyleSheetManager } from "styled-components";

import { ExtendedOpenDataVehicle } from "../common/types";
import Theme from "./Theme";
import { ErrorMessage } from "./molecules";
import { CategorizedRandomVehicleSelector } from "./organisms";
import { Window } from "./templates";
import { ErrorBoundary } from "./atoms";
import useClickOutsideShadowRoot from "./hooks/useClickOutsideShadowRoot";
import useEscape from "./hooks/useEscape";

/**
 * Check if the element is INPUT or TEXTAREA
 *
 * @param {Element} element
 */
function isValidTag(element: Element) {
  return ["INPUT", "TEXTAREA"].includes(element.tagName.toUpperCase());
}

/**
 * Gets the element's position
 *
 * @param {Element} element
 */
function getTargetElementPosition(element: Element): {
  left: number;
  top: number;
} {
  const { top, height, left } = element.getBoundingClientRect();
  const { scrollX, scrollY } = window;

  return {
    left: left + scrollX,
    top: top + height + scrollY,
  };
}

type AppProps = {
  styleContainer: HTMLElement;
  targetElement: Element;
  onVehicle: (vehicle: ExtendedOpenDataVehicle) => void;
  onCancel: () => void;
};

/**
 * Application root
 * Passing the styleContainer fixes styling issues while being rendered inside of a shadow-root.
 *
 * @param {HTMLElement} styleContainer
 * @param {Element}     targetElement
 * @param {Function}    onVehicle
 * @param {Function}    onCancel
 */
const App = ({
  styleContainer,
  targetElement,
  onVehicle,
  onCancel,
}: AppProps) => {
  const ref = useClickOutsideShadowRoot<HTMLDivElement>(onCancel);
  useEscape(onCancel);

  return (
    <StyleSheetManager target={styleContainer}>
      <Theme>
        <Window
          data-testid="kentekenpls-window"
          ref={ref}
          {...getTargetElementPosition(targetElement)}
        >
          <ErrorBoundary
            fallback={
              <ErrorMessage onClose={onCancel}>
                Kenteken, pls is helaas gecrasht.
              </ErrorMessage>
            }
          >
            {isValidTag(targetElement) ? (
              <CategorizedRandomVehicleSelector
                onVehicle={onVehicle}
                onCancel={onCancel}
              />
            ) : (
              <ErrorMessage onClose={onCancel}>
                Kenteken, pls werkt helaas nog niet voor het huidige element.
              </ErrorMessage>
            )}
          </ErrorBoundary>
        </Window>
      </Theme>
    </StyleSheetManager>
  );
};

export default App;
