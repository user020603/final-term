import {Card, Spinner, BlockStack} from '@shopify/polaris';

function LoadingCard() {
  return (
    <Card>
      <BlockStack inlineAlign="center">
        <Spinner accessibilityLabel="Loading notifications" size="small" />
      </BlockStack>
    </Card>
  );
}

export default LoadingCard;