"use client";

import { ArrowDownZA, ArrowUpAZ, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { sonare } from "sonare";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Slider, SliderThumb } from "@/components/ui/slider";

export default function Home() {
  const [minLength, setMinLength] = useState([6]);
  const [maxLength, setMaxLength] = useState([10]);
  const [wordCount, setWordCount] = useState(10);
  const [words, setWords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sortOrder, setSortOrder] = useState<"unsorted" | "asc" | "desc">(
    "unsorted",
  );

  const generateWords = () => {
    setIsGenerating(true);
    // Small delay for better UX
    setTimeout(() => {
      const newWords = Array.from({ length: wordCount }, () =>
        sonare({
          minLength: minLength[0],
          maxLength: maxLength[0],
        }),
      );
      setWords(newWords);
      setIsGenerating(false);
    }, 100);
  };

  const sortedWords = useMemo(() => {
    if (sortOrder === "unsorted") return words;
    if (sortOrder === "asc") {
      return [...words].sort((a, b) => a.localeCompare(b));
    }
    // desc
    return [...words].sort((a, b) => b.localeCompare(a));
  }, [words, sortOrder]);

  const toggleSort = () => {
    setSortOrder((current) => {
      if (current === "unsorted") return "asc";
      if (current === "asc") return "desc";
      return "unsorted";
    });
  };

  return (
    <div className="h-full bg-linear-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="size-6 text-primary" />
            <h1 className="text-4xl font-semibold tracking-tight">
              Sonare Word Generator
            </h1>
          </div>
          <p className="text-muted-foreground text-lg px-4">
            Generate unique, pronounceable words that feel natural
          </p>
        </div>

        {/* Main Content - Side by side on XL screens */}
        <div className="flex flex-col xl:flex-row xl:gap-8 space-y-8 xl:space-y-0">
          {/* Controls Card */}
          <div className="xl:w-1/3">
            <Card>
              <CardHeader className="py-4">
                <CardTitle>Controls</CardTitle>
                <CardDescription>
                  Adjust the parameters to customize your word generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Min Length Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="min-length" className="text-sm font-medium">
                      Minimum Length
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {minLength[0]} characters
                    </span>
                  </div>
                  <Slider
                    id="min-length"
                    aria-label="Minimum word length"
                    value={minLength}
                    onValueChange={setMinLength}
                    min={3}
                    max={20}
                    step={1}
                    className="w-full"
                  >
                    <SliderThumb />
                  </Slider>
                </div>

                {/* Max Length Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="max-length" className="text-sm font-medium">
                      Maximum Length
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {maxLength[0]} characters
                    </span>
                  </div>
                  <Slider
                    id="max-length"
                    aria-label="Maximum word length"
                    value={maxLength}
                    onValueChange={setMaxLength}
                    min={minLength[0]}
                    max={25}
                    step={1}
                    className="w-full"
                  >
                    <SliderThumb />
                  </Slider>
                </div>

                {/* Word Count Input */}
                <div className="space-y-2">
                  <label htmlFor="word-count" className="text-sm font-medium">
                    Number of Words
                  </label>
                  <Input
                    id="word-count"
                    type="number"
                    min={1}
                    max={100}
                    value={wordCount}
                    onChange={(e) =>
                      setWordCount(
                        Math.max(
                          1,
                          Math.min(100, parseInt(e.target.value, 10) || 1),
                        ),
                      )
                    }
                    className="w-full"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateWords}
                  disabled={isGenerating || minLength[0] > maxLength[0]}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? "Generating..." : "Generate Words"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="xl:w-2/3">
            {/* Results */}
            {words.length > 0 && (
              <Card>
                <CardHeader className="py-4">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <CardTitle>Generated Words</CardTitle>
                      <CardDescription>
                        {words.length} unique word
                        {words.length !== 1 ? "s" : ""} generated
                      </CardDescription>
                    </div>
                    <Button
                      onClick={toggleSort}
                      size="icon"
                      variant={sortOrder === "unsorted" ? "outline" : "primary"}
                      aria-label={
                        sortOrder === "unsorted"
                          ? "Sort words alphabetically"
                          : sortOrder === "asc"
                            ? "Sort words descending"
                            : "Remove sorting"
                      }
                    >
                      {sortOrder === "desc" ? (
                        <ArrowDownZA className="size-4" />
                      ) : (
                        <ArrowUpAZ className="size-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {sortedWords.map((word) => (
                      <Card key={word} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-mono font-semibold">
                              {word}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {word.length}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {words.length === 0 && (
              <Empty className="h-full border-dashed border-2">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Sparkles className="h-6 w-6" />
                  </EmptyMedia>
                  <EmptyTitle>No words generated yet</EmptyTitle>
                  <EmptyDescription>
                    Click &ldquo;Generate Words&rdquo; to create your first
                    batch of pronounceable words
                  </EmptyDescription>
                  <Button
                    onClick={generateWords}
                    disabled={isGenerating || minLength[0] > maxLength[0]}
                    className="w-full"
                    size="lg"
                  >
                    Generate Words
                  </Button>
                </EmptyHeader>
              </Empty>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
