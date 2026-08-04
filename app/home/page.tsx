import Home from "@/screens/Home/Home";

const DEFAULT_DEVICE_NAME = "iPhone";
const MAX_DEVICE_NAME_LENGTH = 50;

type HomePageProps = {
  searchParams: Promise<{
    device_name?: string | string[];
  }>;
};

function getDeviceName(value: string | string[] | undefined): string {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const normalizedValue = rawValue?.trim().replace(/\s+/g, " ");

  if (
    !normalizedValue ||
    normalizedValue.length > MAX_DEVICE_NAME_LENGTH ||
    !/^iPhone(?:\s|$)/i.test(normalizedValue)
  ) {
    return DEFAULT_DEVICE_NAME;
  }

  return normalizedValue;
}

async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const deviceName = getDeviceName(params.device_name);

  return <Home deviceName={deviceName} />;
}

export default HomePage;
