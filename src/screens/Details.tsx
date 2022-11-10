import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { Ranking } from "../components/Ranking";
import { api } from "../services/api";

interface RouteParams {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>(
    {} as PoolCardProps
  );
  
  const SCREEN_SECTION_MAPPER = {
    guesses: <Guesses poolId={poolDetails.id} code={poolDetails.code} />,
    ranking: <Ranking />,
  };

  const [currentScreenSection, setCurrentScreenSection] = useState<keyof typeof SCREEN_SECTION_MAPPER>(
    "guesses"
  );

  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);

      const respoonse = await api.get(`/pools/${id}`);
      setPoolDetails(respoonse.data.pool);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível carregar os detalhes do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code,
    });
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={currentScreenSection === "guesses"}
              onPress={() => setCurrentScreenSection("guesses")}
            />

            <Option
              title="Ranking do grupo"
              isSelected={currentScreenSection === "ranking"}
              onPress={() => setCurrentScreenSection("ranking")}
            />
          </HStack>

          {SCREEN_SECTION_MAPPER[currentScreenSection]}
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}
