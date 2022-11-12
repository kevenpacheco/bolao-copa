import { Avatar, Center, HStack, Text } from "native-base";

export interface ParticipantProps {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

interface Props {
  participants: ParticipantProps[];
  count: number;
}

export function Participants({ participants, count }: Props) {
  return (
    <HStack>
      {participants?.map((participant, index) => {
        if (index > 3) return false;

        return (
          <Avatar
            key={participant.id}
            source={{ uri: participant.user.avatarUrl }}
            w={8}
            h={8}
            rounded="full"
            borderWidth={2}
            marginRight={-3}
            borderColor="gray.800"
          >
            {participant.user.name}
          </Avatar>
        );
      })}

      {count > 4 && (
        <Center
          w={8}
          h={8}
          bgColor="gray.700"
          rounded="full"
          borderWidth={1}
          borderColor="gray.800"
        >
          <Text color="gray.100" fontSize="xs" fontFamily="medium">
            {`+${count - 4}`}
          </Text>
        </Center>
      )}
    </HStack>
  );
}
