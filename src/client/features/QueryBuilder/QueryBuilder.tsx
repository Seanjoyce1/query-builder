import { Box, Button, Card, Stack, Typography, useTheme } from "@mui/material";
import { Field, Group } from "../../data/interface";
import GroupComponent from "../Group/Group";
import { useState } from "react";
import { Combinator, FieldType } from "../../data/enums";

function QueryBuilder() {
  const [query, setQuery] = useState<Group>({
    combinator: Combinator.AND,
    rules: [],
  });

  const theme = useTheme();

  const fields: Field[] = [
    { name: "amount", label: "Amount", type: FieldType.NUMBER },
    { name: "name", label: "Name", type: FieldType.TEXT },
    { name: "id", label: "ID", type: FieldType.TEXT },
    {
      name: "transaction_state",
      label: "Transaction State",
      type: FieldType.ENUM,
      options: [
        "SUCCEEDED",
        "REJECTED",
        "ERROR",
        "TIMEOUT",
        "CANCELLED",
        "FAILED",
        "ABORTED",
      ],
    },
    { name: "device_ip", label: "Device IP", type: FieldType.TEXT },
    { name: "installments", label: "Installments", type: FieldType.NUMBER },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/api/save-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });
      console.log("Query sent successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Stack direction={{ xs: "column", lg: "row" }} gap={4}>
      <Box width={{ xs: "100%", lg: "60%" }}>
        <Typography variant="h4" gutterBottom>
          Query Builder
        </Typography>
        <form onSubmit={handleSubmit}>
          <GroupComponent group={query} fields={fields} onChange={setQuery} />
          <Button variant="contained" type="submit">
            <Typography variant="button">Submit</Typography>
          </Button>
        </form>
      </Box>

      <Stack width={{ xs: "100%", lg: "40%" }}>
        <Typography variant="h4" gutterBottom>
          Result
        </Typography>

        <Card
          variant="outlined"
          sx={{
            padding: theme.spacing(2),
            bgcolor: theme.palette.grey[100],
          }}
        >
          <pre>
            <Typography variant="body1">
              {JSON.stringify(query, null, 2)}
            </Typography>
          </pre>
        </Card>
      </Stack>
    </Stack>
  );
}

export default QueryBuilder;
