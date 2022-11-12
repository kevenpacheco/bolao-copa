import { Avatar, Center, HStack, Text, VStack } from "native-base";
import { useAuth } from "../hooks/useAuth";

export interface ParticipantRankingType {
  userId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  points: number;
}
interface RankingCardProps {
  participant: ParticipantRankingType;
  rankingPosition: number;
}

export function RankingCard({
  participant,
  rankingPosition,
}: RankingCardProps) {
  const { user } = useAuth();

  const isTopThree = rankingPosition <= 3;
  const isCurrentUser = participant.userId === user.sub;

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
            {participant.user.name}{" "}
            {isCurrentUser && (
              <Text color="gray.300" fontWeight="bold" fontSize="xs">
                (você)
              </Text>
            )}
          </Text>

          <Text color="gray.200" fontSize="xs">
            {participant.points} ponto(s)
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
