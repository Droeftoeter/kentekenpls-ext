import React, { useEffect } from "react";
import { motion } from "framer-motion";

import type { RdwOpenDataVehicle } from "../../common/types";

import * as Icons from "../icons";
import { Option } from "../atoms";
import { Header, Slider, ErrorMessage } from "../molecules";

import categories from "../categories";

import useRandomVehicle from "../hooks/useRandomVehicle";
import useNavigationStack from "../hooks/useNavigationStack";

type SelectProps = JSX.IntrinsicElements["div"] & {
  onVehicle: (vehicle: RdwOpenDataVehicle) => void;
  onCancel: () => void;
};

const Selector = ({ onVehicle, onCancel }: SelectProps) => {
  const { stack, activeChild, push, pop } = useNavigationStack(categories);
  const { getVehicle, loading, error } = useRandomVehicle();

  const category = stack.slice(-1).shift();
  const query = category?.items[activeChild];

  /**
   * Deal with keyboard shortcuts
   */
  useEffect(() => {
    const handleKeyDown = async ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        onCancel();
      }

      if (query && (key === "Enter" || key === " " || key === "ArrowRight")) {
        if ("where" in query) {
          await getVehicle(query.id, query.where, onVehicle);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [getVehicle, onVehicle, onCancel, query]);

  if (error) {
    return <ErrorMessage onClose={onCancel}>{error}</ErrorMessage>;
  }

  if (!category) {
    return null;
  }

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{
        height: loading ? "3rem" : `${category.items.length * 3 + 3}rem`,
      }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
    >
      <Header
        onBack={stack.length > 1 ? pop : undefined}
        onCancel={!loading ? onCancel : undefined}
        loading={loading}
      >
        {loading && "Kenteken zoeken..."}
      </Header>
      {!loading && (
        <Slider index={stack.length - 1}>
          {stack.map((category) => (
            <div key={category.id}>
              {category.items.map((item, index) =>
                // biome-ignore lint/correctness/useJsxKeyInIterable: all child
                "items" in item ? (
                  <Option
                    key={item.id}
                    icon={<Icons.ArrowForward title="Openen" />}
                    active={activeChild === index}
                    onClick={() => push(item)}
                  >
                    {item.title}
                  </Option>
                ) : (
                  <Option
                    key={item.id}
                    icon={<Icons.Input title="Voertuig ophalen" />}
                    active={activeChild === index}
                    onClick={() => getVehicle(item.id, item.where, onVehicle)}
                  >
                    {item.title}
                  </Option>
                ),
              )}
            </div>
          ))}
        </Slider>
      )}
    </motion.div>
  );
};

export default Selector;
