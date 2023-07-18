import React, { JSX, useEffect } from "react";

import { Query } from "../../common/types";

import * as Icons from "../icons";
import { Option } from "../atoms";
import { Header, Slider } from "../molecules";

import categories from "../categories";

import useNavigationStack from "../hooks/useNavigationStack";

type SelectProps = JSX.IntrinsicElements["div"] & {
  onQuery: (query: Query) => void;
  onCancel: () => void;
};

const CategorySelector = ({ onQuery, onCancel }: SelectProps) => {
  const { stack, activeChild, push, pop } = useNavigationStack(categories);

  const category = stack.slice(-1).shift();

  /**
   * Deal with keyboard shortcuts
   */
  useEffect(() => {
    const handleKeyDown = async ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        onCancel();
      }

      if (
        category &&
        (key === "Enter" || key === " " || key === "ArrowRight")
      ) {
        const query = category.items[activeChild];

        if ("where" in query) {
          onQuery(query);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [category, activeChild]);

  if (!category) {
    return null;
  }

  return (
    <>
      <Header onCancel={onCancel} onBack={stack.length > 1 ? pop : undefined} />
      <Slider index={stack.length - 1}>
        {stack.map((category) => (
          <div key={category.id}>
            {category.items.map((item, index) =>
              "items" in item ? (
                <Option
                  key={item.id}
                  icon={<Icons.ArrowForward title="Enter category" />}
                  active={activeChild === index}
                  onClick={() => push(item)}
                >
                  {item.title}
                </Option>
              ) : (
                <Option
                  key={item.id}
                  icon={<Icons.Input title="Get vehicle" />}
                  active={activeChild === index}
                  onClick={() => onQuery(item)}
                >
                  {item.title}
                </Option>
              ),
            )}
          </div>
        ))}
      </Slider>
    </>
  );
};

export default CategorySelector;
