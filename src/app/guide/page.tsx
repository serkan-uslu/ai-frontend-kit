"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, FileText, Image as ImageIcon, Send, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GuidePage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          AI Frontend Kit Guide
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
          Learn how to use all the features of the AI Frontend Kit
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="chat">Chat Interface</TabsTrigger>
          <TabsTrigger value="image-generate">Image Generation</TabsTrigger>
          <TabsTrigger value="image-edit">Image Editing</TabsTrigger>
          <TabsTrigger value="image-caption">Image Understanding</TabsTrigger>
        </TabsList>

        {/* Chat Interface Tab */}
        <TabsContent value="chat" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Chat Interface</CardTitle>
              <CardDescription>
                Learn how to use the basic chat interface to interact with AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">Sending Messages</h3>
                  <p>
                    Type your message in the input box and click the send button
                    or press Enter to send.
                  </p>

                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-full relative border rounded-md flex items-center">
                        <div className="px-3 py-2 w-full">
                          Type a message...
                        </div>
                        <Button size="icon" variant="ghost" className="h-9 w-9">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The chat input with send button
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">Chat History</h3>
                  <p>
                    Your conversation history is displayed in the chat area.
                    Messages from you and the AI are clearly distinguished.
                  </p>

                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          U
                        </div>
                        <div className="flex-1 bg-muted rounded-lg p-3">
                          <p>Hello, can you help me with something?</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                          AI
                        </div>
                        <div className="flex-1 bg-secondary/20 rounded-lg p-3">
                          <p>
                            Of course! I&apos;m here to help. What do you need
                            assistance with?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Image Generation Tab */}
        <TabsContent value="image-generate" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Image Generation</CardTitle>
              <CardDescription>
                Generate images using Google Gemini AI based on your text
                prompts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">
                    How to Generate Images
                  </h3>
                  <ol className="list-decimal list-inside space-y-3">
                    <li>Type your image description in the chat input</li>
                    <li>Click the blue image generation button (image icon)</li>
                    <li>Wait for the AI to generate your image</li>
                    <li>The generated image will appear in the chat</li>
                  </ol>

                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-full relative border rounded-md flex items-center">
                        <div className="px-3 py-2 w-full">
                          A beautiful sunset over mountains
                        </div>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-9 w-9 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-800/30 border-blue-200 dark:border-blue-800"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Click the blue image button to generate an image
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">
                    Tips for Better Results
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Be specific about what you want in the image</li>
                    <li>
                      Include details about style, lighting, and composition
                    </li>
                    <li>
                      Specify artistic styles like &quot;watercolor&quot;,
                      &quot;photorealistic&quot;, etc.
                    </li>
                    <li>Mention color schemes if you have preferences</li>
                  </ul>

                  <div className="border rounded-lg p-4 bg-secondary/10">
                    <p className="font-medium mb-2">Example Prompts:</p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>
                        &quot;A watercolor painting of a coastal village at
                        sunset&quot;
                      </li>
                      <li>
                        &quot;Photorealistic portrait of a cat with blue eyes in
                        a garden&quot;
                      </li>
                      <li>
                        &quot;Futuristic cityscape with flying cars and neon
                        lights&quot;
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Image Editing Tab */}
        <TabsContent value="image-edit" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Image Editing</CardTitle>
              <CardDescription>
                Edit existing images using Google Gemini AI with text
                instructions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">How to Edit Images</h3>
                  <ol className="list-decimal list-inside space-y-3">
                    <li>Click the upload button to select an image</li>
                    <li>
                      Once the image is uploaded, it will appear as a preview
                    </li>
                    <li>Type your editing instructions in the chat input</li>
                    <li>Click the purple edit button (edit icon)</li>
                    <li>Wait for the AI to edit your image</li>
                    <li>The edited image will appear in the chat</li>
                  </ol>

                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="flex justify-center p-2 border-2 border-dashed rounded-md">
                        <div className="text-center">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Upload className="h-4 w-4" />
                            <span>Upload Image</span>
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full relative border rounded-md flex items-center">
                          <div className="px-3 py-2 w-full">
                            Make the sky more dramatic with clouds
                          </div>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-9 w-9 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-800/30 border-purple-200 dark:border-purple-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload an image and click the purple edit button
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">
                    Effective Editing Instructions
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Be clear about what specific changes you want</li>
                    <li>Focus on one or two major edits per request</li>
                    <li>Mention specific areas of the image to modify</li>
                    <li>
                      Include style guidance if you want a particular look
                    </li>
                  </ul>

                  <div className="border rounded-lg p-4 bg-secondary/10">
                    <p className="font-medium mb-2">
                      Example Editing Instructions:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>
                        &quot;Change the background from day to night&quot;
                      </li>
                      <li>
                        &quot;Add a bouquet of flowers in the foreground&quot;
                      </li>
                      <li>
                        &quot;Make the colors more vibrant and saturated&quot;
                      </li>
                      <li>
                        &quot;Transform the scene to winter with snow&quot;
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Image Understanding Tab */}
        <TabsContent value="image-caption" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Image Understanding</CardTitle>
              <CardDescription>
                Get AI-generated descriptions and analysis of your images
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">How to Caption Images</h3>
                  <ol className="list-decimal list-inside space-y-3">
                    <li>Click the upload button to select an image</li>
                    <li>
                      Once the image is uploaded, it will appear as a preview
                    </li>
                    <li>
                      Optionally, type specific instructions for the analysis
                    </li>
                    <li>Click the teal caption button (file-text icon)</li>
                    <li>Wait for the AI to analyze your image</li>
                    <li>The image description will appear in the chat</li>
                  </ol>

                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="flex justify-center p-2 border-2 border-dashed rounded-md">
                        <div className="text-center">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Upload className="h-4 w-4" />
                            <span>Upload Image</span>
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full relative border rounded-md flex items-center">
                          <div className="px-3 py-2 w-full">
                            Describe this image in detail
                          </div>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-9 w-9 bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/20 dark:hover:bg-teal-800/30 border-teal-200 dark:border-teal-800"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload an image and click the teal caption button
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">
                    Customizing Image Analysis
                  </h3>
                  <p>
                    You can customize how the AI analyzes your image by
                    providing specific instructions:
                  </p>

                  <div className="border rounded-lg p-4 bg-secondary/10">
                    <p className="font-medium mb-2">Example Instructions:</p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>&quot;Identify all objects in this image&quot;</li>
                      <li>
                        &quot;Describe the mood and atmosphere of this
                        scene&quot;
                      </li>
                      <li>
                        &quot;Analyze the composition of this photograph&quot;
                      </li>
                      <li>
                        &quot;What historical period does this image
                        represent?&quot;
                      </li>
                      <li>
                        &quot;Explain the technical aspects of this
                        diagram&quot;
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                      Tip
                    </h4>
                    <p className="text-sm">
                      Leave the text field empty if you want a general
                      description of the image. Add specific instructions only
                      when you need focused analysis on particular aspects.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">
          Return to{" "}
          <Link href="/" className="text-primary hover:underline">
            Chat
          </Link>{" "}
          to try these features
        </p>
      </div>
    </div>
  );
}
