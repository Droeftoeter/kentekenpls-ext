import React from "react";
import styled, { useTheme } from "styled-components";
import ContentLoader from "react-content-loader";
import { motion, AnimatePresence } from "framer-motion";

import { ExtendedOpenDataVehicle } from "../../common/types";
import { Header, VehicleSummary, VehicleSpecSheet } from "../molecules";

type VehicleInfoProps = {
  onCancel: () => void;
  onRefresh?: () => void;
  onBack?: () => void;
  vehicle?: ExtendedOpenDataVehicle;
};

const Loading = () => {
  const theme = useTheme();

  return (
    <ContentLoader
      viewBox="0 0 480 240"
      backgroundColor={theme.surfaceColorDarker}
      foregroundColor={theme.surfaceColorDarkest}
      width="30rem"
    >
      <rect x={16} y={16} rx={2} width={48} height={20} />

      <rect x={16} y={16 + 20 + 24} rx={2} width={64} height={26} />

      <rect x={16} y={16 + 20 + 24 + 28} rx={2} width={128} height={26} />

      <rect
        x={16}
        y={16 + 20 + 24 + 28 + 28 + 24}
        rx={2}
        width={208}
        height={48}
      />
    </ContentLoader>
  );
};

const Container = styled.div`
    overflow: hidden;

    display: grid;

    max-width: 30rem;
    background: linear-gradient(315deg, ${(props) =>
      props.theme.surfaceColorDarkest} 0%, ${(props) =>
  props.theme.surfaceColorDarker} 80%);
`;

const First = styled(motion.div)`
    grid-column: 1;
    grid-row:    1;
`;

const Second = styled(motion.div)`
    grid-column: 1;
    grid-row:    2;

    background: ${(props) => props.theme.surfaceColor};
    border-top: .0625rem solid ${(props) => props.theme.borderColor};
`;

const VehicleInfo = ({
  onCancel,
  onBack,
  onRefresh,
  vehicle,
}: VehicleInfoProps) => (
  <>
    <Header
      onBack={onBack}
      onCancel={onCancel}
      onRefresh={vehicle && onRefresh}
    />
    {vehicle ? (
      <Container>
        <AnimatePresence initial={false} custom={0}>
          <First
            initial={{ x: "30rem", zIndex: 1 }}
            animate={{ x: 0, zIndex: 1 }}
            exit={{ x: "-30rem", zIndex: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            key={`${vehicle.kenteken}-info`}
          >
            <VehicleSummary vehicle={vehicle} />
          </First>
          <Second
            initial={{ y: "100%", zIndex: 1 }}
            animate={{ y: 0, zIndex: 1 }}
            exit={{ y: "100%", zIndex: 1 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            key={`${vehicle.kenteken}-specs`}
          >
            <VehicleSpecSheet vehicle={vehicle} />
          </Second>
        </AnimatePresence>
      </Container>
    ) : (
      <Loading />
    )}
  </>
);

export default VehicleInfo;
