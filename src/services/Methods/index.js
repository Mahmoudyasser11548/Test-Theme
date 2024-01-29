/* eslint-disable implicit-arrow-linebreak */
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.VITE_BASE_API_URL;

export const createThunk = (name, url, method) =>
  createAsyncThunk(
    `${name}/${method}`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/${url}/${
            method === "put" ? payload.id : method === "delete" ? payload : ""
          }`,
          {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );
