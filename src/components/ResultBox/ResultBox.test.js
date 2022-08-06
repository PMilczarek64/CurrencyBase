import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';



describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCases = [150, 25, 33, 87, 239]
  const negTestCases = [-150, -25, -33, -87, -239]

  for(const testObj of testCases) {
    it('should convert when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testObj} />);
      const countedCurrency = screen.getByTestId('counted-currency');
      expect(countedCurrency).toHaveTextContent(`${formatAmountInCurrency(testObj, 'PLN')} = ${formatAmountInCurrency(testObj / 3.5, 'USD')}`);
      cleanup();
    });
  };
  for(const testObj of testCases) {
    it('should convert when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testObj} />);
      const countedCurrency = screen.getByTestId('counted-currency');
      expect(countedCurrency).toHaveTextContent(`${formatAmountInCurrency(testObj, 'USD')} = ${formatAmountInCurrency(testObj * 3.5, 'PLN')}`);
      cleanup();
    });
  };
  for(const testObj of testCases) {
    it('should convert when PLN -> PLN', () => {
      render(<ResultBox from="PLN" to="PLN" amount={testObj} />);
      const countedCurrency = screen.getByTestId('counted-currency');
      expect(countedCurrency).toHaveTextContent(`${formatAmountInCurrency(testObj, 'PLN')} = ${formatAmountInCurrency(testObj, 'PLN')}`);
      cleanup();
    });
  }
  for(const testObj of negTestCases) {
    it('should return "Wrong value..." when number is negative', () => {
      render(<ResultBox from="PLN" to="PLN" amount={testObj} />);
      const countedCurrency = screen.getByTestId('counted-currency');
      expect(countedCurrency).toHaveTextContent('Wrong value...');
      cleanup();
    });
  }
});