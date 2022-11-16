import { FlatList, useToast } from "native-base";
import { useEffect, useState } from "react";
import { api } from "../services/api";

import { EmptyRakingList } from "./EmptyRakingList";
import { Loading } from "./Loading";
import { ParticipantRankingType, RankingCard } from "./RankingCard";

interface RankingPropType {
  poolId: string;
}

export function Ranking({ poolId }: RankingPropType) {
  const [isLoading, setIsLoading] = useState(true);
  const [ranking, setRanking] = useState<ParticipantRankingType[]>([]);

  const toast = useToast();

  async function fetchCurrentPoolRanking() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/ranking`);
      setRanking(response.data.ranking);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possível carregar o ranking",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCurrentPoolRanking();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={ranking}
      keyExtractor={(item) => item.userId}
      renderItem={({ item, index }) => (
        <RankingCard participant={item} rankingPosition={index + 1} />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyRakingList />}
    />
  );
}
