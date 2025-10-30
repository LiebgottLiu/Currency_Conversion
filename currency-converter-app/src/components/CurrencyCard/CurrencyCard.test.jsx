// src/components/CurrencyCard/CurrencyCard.test.jsx
import '@testing-library/jest-dom'; // 注册 matcher
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CurrencyCard from './CurrencyCard';

vi.mock('axios');

vi.mock('../CurrencyGraphModal/CurrencyModal', () => {
  return {
    __esModule: true,
    default: ({ visible, data, code, loading }) => {
      return (
        <div data-testid={`modal-${code}`}>
          <div data-testid={`modal-visible-${code}`}>{visible ? 'visible' : 'hidden'}</div>
          <div data-testid={`modal-loading-${code}`}>{loading ? 'loading' : 'idle'}</div>
          <div data-testid={`modal-data-${code}`}>{JSON.stringify(data)}</div>
        </div>
      );
    },
  };
});

describe('CurrencyCard', () => {
  const testCode = 'CAD';
  const testSymbol = '$';
  const testFlag = 'https://flagcdn.com/w40/ca.png';
  const testAmount = '90.00';
  const testRate = '0.9000';
  const baseTimestamp = '01/01/2025 12:00:00';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders code, flag, amount and rate', () => {
    render(
      <CurrencyCard
        code={testCode}
        symbol={testSymbol}
        flag={testFlag}
        amount={testAmount}
        rate={testRate}
        lastUpdated={baseTimestamp}
      />
    );


    expect(screen.getByText(testCode)).toBeInTheDocument();
    expect(screen.getByText(`${testSymbol}${testAmount}`)).toBeInTheDocument();
    expect(screen.getByText(`1 AUD = ${testRate} ${testCode}`)).toBeInTheDocument();
    const img = screen.getByAltText(testCode);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', testFlag);
  });

  it('on click fetches 14 historical datapoints and passes them to the modal; second click triggers another 14 requests', async () => {
    let callIndex = 0;
    axios.get.mockImplementation(() => {
      callIndex += 1;
      return Promise.resolve({
        data: {
          rates: {
            AUD: 1,
            [testCode]: Number((callIndex * 0.1).toFixed(4)),
          },
        },
      });
    });

    render(
      <CurrencyCard
        code={testCode}
        symbol={testSymbol}
        flag={testFlag}
        amount={testAmount}
        rate={testRate}
        lastUpdated={baseTimestamp}
      />
    );

    const codeNode = screen.getByText(testCode);
    const cardNode = codeNode.closest('.currency-card') || codeNode;

    // click once
    fireEvent.click(cardNode);

    // wait until axios.get has been called 14 times for the first click
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(14);
    });

    const modalDataNode = await screen.findByTestId(`modal-data-${testCode}`);
    const modalVisibleNode = screen.getByTestId(`modal-visible-${testCode}`);
    const modalLoadingNode = screen.getByTestId(`modal-loading-${testCode}`);

    expect(modalVisibleNode.textContent).toBe('visible');
    expect(modalLoadingNode.textContent).toBe('idle');

    const parsed = JSON.parse(modalDataNode.textContent);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(14);

    expect(parsed[0]).toHaveProperty('rate', '0.1000');
    expect(parsed[1]).toHaveProperty('rate', '0.2000');
    expect(parsed[13]).toHaveProperty('rate', '1.4000');
    fireEvent.click(cardNode);

    // now total calls should become 28 (14 more)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(28);
    });

    const parsed2 = JSON.parse(screen.getByTestId(`modal-data-${testCode}`).textContent);
    expect(parsed2).toHaveLength(14);
  });
});
