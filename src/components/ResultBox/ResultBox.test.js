import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import { convertPLNToUSD } from '../../utils/convertPLNtoUSD';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
    const testAmounts = [23, 100, 200, 345.543, 3999, -1, -134, -1000];
    for (const currentAmount of testAmounts) {
      if (currentAmount > 0) {
        it('should render proper info about conversion when PLN -> USD', () => {
          render(<ResultBox from="PLN" to="USD" amount={currentAmount} />);
          const output = screen.getByTestId('output');
          expect(output).toHaveTextContent(`${formatAmountInCurrency(currentAmount, 'PLN')} = ${convertPLNToUSD(currentAmount)}`);
          cleanup();
        });
        it('should render proper info about conversion when USD -> PLN', () => {
          render(<ResultBox from="USD" to="PLN" amount={currentAmount} />);
          const output = screen.getByTestId('output');
          expect(output).toHaveTextContent(`${formatAmountInCurrency(currentAmount, 'USD')} = ${convertUSDToPLN(currentAmount)}`);
          cleanup();
        });
        it('should render proper info about conversion when PLN -> PLN', () => {
          render(<ResultBox from="PLN" to="PLN" amount={currentAmount} />);
          const output = screen.getByTestId('output');
          expect(output).toHaveTextContent(`${formatAmountInCurrency(currentAmount, 'PLN')} = ${formatAmountInCurrency(currentAmount, 'PLN')}`);
          cleanup();
        });
        it('should render proper info about conversion when USD -> USD', () => {
          render(<ResultBox from="USD" to="USD" amount={currentAmount} />);
          const output = screen.getByTestId('output');
          expect(output).toHaveTextContent(`${formatAmountInCurrency(currentAmount, 'USD')} = ${formatAmountInCurrency(currentAmount, 'USD')}`);
          cleanup();
        });
      } else {
        it('should render info about wrong value when amount is lower than 0', () => {
          render(<ResultBox from="PLN" to="USD" amount={currentAmount} />);
          const output = screen.getByTestId('output');
          expect(output).toHaveTextContent('Wrong value...');
          cleanup();
        });
      };
    };
  });