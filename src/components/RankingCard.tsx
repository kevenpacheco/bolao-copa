import { Avatar, Center, HStack, Text, VStack } from "native-base";
import { ParticipantProps } from "./Participants";

interface RankingCardProps {
  participant: ParticipantProps,
  rankingPosition: number,
  points: number,
}

export function RankingCard({participant, rankingPosition, points}: RankingCardProps) {
  const isTopThree = rankingPosition <= 3

  return (
    <HStack
      w="full"
      h={20}
      bgColor="gray.800"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      justifyContent="space-between"
      alignItems="center"
      rounded="sm"
      mb={3}
      p={4}
    >
      <HStack>
        <Avatar
          source={{ uri: participant.user.avatarUrl }}
          w={10}
          h={10}
          rounded="full"
          borderWidth={2}
          borderColor="gray.800"
        />

        <VStack ml={3}>
          <Text color="white" fontWeight="bold">
            {participant.user.name}
          </Text>
          <Text color="gray.200" fontSize="xs">
            {points} ponto(s)
          </Text>
        </VStack>
      </HStack>

      <Center
        bgColor={isTopThree ? "yellow.500" : "gray.600"}
        px={3}
        py={1}
        rounded="20"
        _text={{
          fontSize: "xs",
          fontWeight: "bold",
          color: isTopThree ? "gray.950" : "gray.300",
        }}
      >
        {`${rankingPosition}°`}
      </Center>
    </HStack>
  );
}
