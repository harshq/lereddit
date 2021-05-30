import { Flex, useColorMode, FlexProps, Box } from "@chakra-ui/react";

export const Container = (
  props: FlexProps & { varient?: "small" | "normal" }
) => {
  const { colorMode } = useColorMode();

  const color = { light: "black", dark: "white" };
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Flex
        width={getWidth(props.varient)}
        color={color[colorMode]}
        {...props}
      />
    </Flex>
  );
};

const getWidth = (v: string | undefined) => {
  switch (v) {
    case "small":
      return "320px";

    default:
      return "700px";
  }
};
