import {
  Avatar,
  Center,
  FlatList,
  HStack,
  Text,
  VStack,
} from "native-base";

import { EmptyRakingList } from "./EmptyRakingList";
import { RankingCard } from "./RankingCard";

export function Ranking() {
  const ranking = [
    {
      participant: {
        id: "awdwad",
        user: {
          avatarUrl: "https://github.com/kevenpacheco.png",
          name: "Keven Pacheco",
        },
      },
      points: 30,
    },
  ];

  return (
    <FlatList
      data={ranking}
      keyExtractor={(item) => item.participant.id}
      renderItem={({ item, index }) => (
        <RankingCard
          participant={item.participant}
          points={item.points}
          rankingPosition={index + 1}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyRakingList />}
    />
  );
}
