// Paste the earlier frontend code into this file
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OddsJamClone() {
  const [oddsData, setOddsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sportFilter, setSportFilter] = useState("");

  const fetchOdds = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/odds");
      const transformed = response.data.map((event) => ({
        event: `${event.home_team} vs ${event.away_team}`,
        sport: event.sport_title,
        bookmakers: event.bookmakers.map((book) => ({
          name: book.title,
          outcomes: book.markets[0]?.outcomes || [],
        })),
      }));
      setOddsData(transformed);
    } catch (err) {
      console.error("Error fetching odds:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOdds();
  }, []);

  const calculateBestOdds = (outcomes) => {
    return outcomes.reduce((best, current) => {
      if (!best || current.price > best.price) return current;
      return best;
    }, null);
  };

  const filteredOdds = sportFilter
    ? oddsData.filter((game) => game.sport.toLowerCase().includes(sportFilter.toLowerCase()))
    : oddsData;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Sharp Betting Dashboard</h1>

      <div className="mb-4 flex items-center gap-4">
        <Input
          placeholder="Filter by sport (e.g. NBA, MLB)"
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
          className="w-full max-w-md"
        />
        <Button onClick={fetchOdds}>Refresh Odds</Button>
      </div>

      {loading ? (
        <p className="text-lg">Loading odds...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOdds.map((match, index) => (
            <Card key={index} className="bg-white rounded-2xl shadow p-4">
              <CardContent>
                <h2 className="text-xl font-semibold mb-2">{match.event}</h2>
                <p className="text-sm text-gray-500 mb-3">Sport: {match.sport}</p>
                {match.bookmakers.map((book, i) => {
                  const best = calculateBestOdds(book.outcomes);
                  return (
                    <div key={i} className="mb-2 border p-2 rounded-md">
                      <h3 className="font-medium text-sm mb-1">{book.name}</h3>
                      <ul className="text-sm">
                        {book.outcomes.map((outcome, j) => (
                          <li
                            key={j}
                            className={
                              outcome.name === best.name && outcome.price === best.price
                                ? "text-green-600 font-bold"
                                : "text-gray-700"
                            }
                          >
                            {outcome.name}: {outcome.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
