import { useState, type ReactNode } from "react";
import {
  Alert, AppShell, Button, Detail, EmptyState, Field, Form, Heading, Screen, Section, Stat,
  StatGroup, Table, Text, defineApp, useCollection, useDisplayState,
} from "@wso2/prototype-kit";

interface Conversion {
  id: string;
  convertedAt: string;
  from: string;
  to: string;
  amount: string;
  result: string;
  rate: string;
}

const conversions: Conversion[] = [
  { id: "1004", convertedAt: "2026-01-15 09:58", from: "USD", to: "EUR", amount: "250.00", result: "230.00", rate: "0.9200" },
  { id: "1003", convertedAt: "2026-01-14 16:20", from: "GBP", to: "JPY", amount: "80.00", result: "15139.24", rate: "189.2405" },
  { id: "1002", convertedAt: "2026-01-14 11:05", from: "EUR", to: "INR", amount: "1200.00", result: "108521.74", rate: "90.4348" },
  { id: "1001", convertedAt: "2026-01-12 08:41", from: "CAD", to: "USD", amount: "45.50", result: "33.46", rate: "0.7353" },
];

const perUsd: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, AUD: 1.53, CAD: 1.36, CHF: 0.88, INR: 83.2,
};
const currencies = Object.keys(perUsd);
const fetchedAt = "2026-01-15 10:42 UTC";

const user = { name: "Dana Whitfield", email: "dana@example.com" };

function Shell({ children }: { children: ReactNode }) {
  return (
    <AppShell
      id="shell"
      user={user}
      nav={[
        { id: "nav.convert", label: "Convert", to: "screen.convert" },
        { id: "nav.log", label: "Conversion log", to: "screen.log" },
      ]}
      account="screen.account"
      settings="screen.settings"
      signOut="screen.signed-out"
    >
      {children}
    </AppShell>
  );
}

function Convert() {
  const state = useDisplayState();
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const parsed = Number(amount);
  const amountError =
    state === "state.validation-error" || amount.trim() === "" || Number.isNaN(parsed) || parsed <= 0
      ? "Enter an amount greater than zero"
      : undefined;
  const sameError = from === to ? "Choose two different currencies" : undefined;
  const unavailable = state === "state.failed";
  const rate = (perUsd[to] ?? 1) / (perUsd[from] ?? 1);
  const showResult = !amountError && !sameError && !unavailable;
  const result = (parsed * rate).toFixed(2);

  return (
    <Shell>
      <Heading
        id="heading.convert"
        text="Convert currency"
        actions={<Button id="btn.view-log" label="View log" to="screen.log" />}
      />
      {unavailable && (
        <Alert
          id="alert.rates-unavailable"
          tone="error"
          title="Live rates are unavailable"
          text="No result is shown because current rates could not be fetched. Try again in a few minutes."
        />
      )}
      <Section id="section.convert" title="Amount" subtitle="The result updates as you type.">
        <Form id="form.convert">
          <Field
            id="field.amount"
            label="Amount"
            type="number"
            required
            value={amount}
            onChange={setAmount}
            error={amountError}
          />
          <Field id="field.from" label="From" type="select" options={currencies} value={from} onChange={setFrom} />
          <Field id="field.to" label="To" type="select" options={currencies} value={to} onChange={setTo} error={sameError} />
          <Button
            id="btn.swap"
            label="Swap currencies"
            onPress={() => {
              setFrom(to);
              setTo(from);
            }}
          />
        </Form>
      </Section>
      {showResult && (
        <Section id="section.result" title="Result">
          <StatGroup>
            <Stat id="stat.result" label={`${amount} ${from} equals`} value={`${result} ${to}`} icon="DollarSign" tone="success" />
            <Stat id="stat.rate" label="Rate used" value={rate.toFixed(4)} hint={`1 ${from} in ${to}`} icon="TrendingUp" />
          </StatGroup>
          <Detail
            id="detail.rate"
            fields={[
              { label: "Rate fetched", value: fetchedAt },
              { label: "Log", value: "Saved to your conversion log after 2 seconds without changes" },
            ]}
          />
        </Section>
      )}
      {!showResult && !unavailable && (
        <Text id="text.no-result" text="Nothing is logged until the input is valid." />
      )}
    </Shell>
  );
}

function Log() {
  const state = useDisplayState();
  const all = useCollection<Conversion>("conversions");
  const items = state === "state.empty" ? [] : all.items;
  return (
    <Shell>
      <Heading
        id="heading.log"
        text="Conversion log"
        actions={<Button id="btn.convert-more" label="New conversion" emphasis="primary" to="screen.convert" />}
      />
      <Section id="section.log" title="Your conversions" count={items.length} subtitle="Newest first. Only you can see these.">
        <Table
          id="table.log"
          columns={[
            "Converted",
            "From",
            "To",
            { label: "Amount", kind: "number" },
            { label: "Result", kind: "number" },
            { label: "Rate", kind: "number" },
          ]}
          rows={items.map((c) => ({
            id: `conversion.${c.id}`,
            cells: [c.convertedAt, c.from, c.to, c.amount, c.result, c.rate],
            actions: [
              { id: `conversion.${c.id}.delete`, label: "Delete", emphasis: "danger" as const, onPress: () => all.remove(c.id) },
            ],
          }))}
          empty={
            <EmptyState
              id="empty.log"
              title="No conversions yet"
              text="Conversions you make appear here."
              actions={<Button id="btn.empty-convert" label="Convert an amount" emphasis="primary" to="screen.convert" />}
            />
          }
        />
      </Section>
    </Shell>
  );
}

function Account() {
  return (
    <Shell>
      <Heading id="heading.account" text="Account" />
      <Detail id="detail.account" fields={[{ label: "Name", value: user.name }, { label: "Email", value: user.email }]} />
    </Shell>
  );
}

function Settings() {
  return (
    <Shell>
      <Heading id="heading.settings" text="Settings" />
      <Text id="text.settings" text="There are no preferences to change yet." />
    </Shell>
  );
}

function SignedOut() {
  return (
    <Screen>
      <Heading id="heading.signed-out" text="You are signed out" />
      <Button id="btn.sign-in" label="Sign in" emphasis="primary" to="screen.convert" />
    </Screen>
  );
}

export default defineApp({
  screens: {
    "screen.convert": Convert,
    "screen.log": Log,
    "screen.account": Account,
    "screen.settings": Settings,
    "screen.signed-out": SignedOut,
  },
  data: { conversions },
});
