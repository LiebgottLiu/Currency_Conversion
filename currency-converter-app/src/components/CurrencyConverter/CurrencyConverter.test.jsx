import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyConverter from './CurrencyConverter';
import axios from 'axios';

vi.mock('axios');

vi.mock('../CurrencyInput/CurrencyInput', () => {
  return {
    __esModule: true,
    default: (props) => {
      return (
        <input
          role="spinbutton"
          aria-label="aud-input"
          value={props.amount ?? ''}
          onChange={(e) => {
            // call parent's onChange with numeric value 
            const val = e.target.value === '' ? undefined : Number(e.target.value);
            props.onChange(val);
          }}
        />
      );
    },
  };
});

vi.mock('../CurrencyCard/CurrencyCard', () => {
  return {
    __esModule: true,
    default: ({ code, amount }) => {
      return (
        <div data-testid={`card-${code}`}>
          <span>{code}</span>
          <span>{amount}</span>
        </div>
      );
    },
  };
});

describe('CurrencyConverter Component', () => {
  const mockRates = {
    AUD: 1,
    CAD: 0.9,
    EUR: 0.7,
    GBP: 0.6,
    NZD: 1.2,
    USD: 0.65,
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: { rates: mockRates, timestamp: 1760140797 },
    });
  });

  it('renders title, input and convert button', async () => {
    render(<CurrencyConverter />);
    expect(screen.getByText(/AUD Converter/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Covert/i })).toBeInTheDocument();
  });

  it('renders currency cards after fetching rates', async () => {
    render(<CurrencyConverter />);
    // wait for mocked axios to resolve and component to render currency cards
    const cadCard = await screen.findByText('CAD');
    expect(cadCard).toBeInTheDocument();
  });

  it('convert calculation updates when AUD amount changes', async () => {
    render(<CurrencyConverter />);
    await screen.findByText('CAD');

    const input = screen.getByRole('spinbutton', { name: /aud-input/i }) || screen.getByRole('spinbutton');
    // change AUD amount to 100
    fireEvent.change(input, { target: { value: '100' } });
    const cadAmount = await screen.findByText('90.00');
    expect(cadAmount).toBeInTheDocument();
  });
});