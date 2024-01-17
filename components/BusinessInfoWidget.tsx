import Card from './ui/Card';
import Text from './ui/Text';

const BusinessInfoWidget = () => (
  <Card title="Business details">
    <Text className="leading-relaxed">
      I am a Prague-based (Czechia) solopreneur registered with the company
      registration number (IČO) <Text backlight>07605901</Text> and VAT (DIČ) ID{' '}
      <Text backlight>CZ8911274350</Text>.
    </Text>
  </Card>
);

export default BusinessInfoWidget;
