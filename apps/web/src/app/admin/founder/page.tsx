"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { authedFetch, uploadMedia } from "@/lib/auth";

export default function AdminFounderPage() {
  const [founder, setFounder] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    authedFetch("/founder")
      .then(setFounder)
      .catch((e) => setError(e.message));
  }, []);

  const save = async () => {
    setError("");
    setMessage("");
    try {
      const updated = await authedFetch("/founder", {
        method: "PATCH",
        body: JSON.stringify({
          id: founder.id,
          name: founder.name,
          title: founder.title,
          biography: founder.biography,
          photo: founder.photo,
          email: founder.email,
          phone: founder.phone,
          linkedinUrl: founder.linkedinUrl,
          githubUrl: founder.githubUrl,
          resumeUrl: founder.resumeUrl,
          experience: JSON.parse(founder._experience || "[]"),
          education: JSON.parse(founder._education || "[]"),
          skills: JSON.parse(founder._skills || "[]"),
          achievements: JSON.parse(founder._achievements || "[]"),
          certificates: JSON.parse(founder._certificates || "[]"),
          timeline: JSON.parse(founder._timeline || "[]"),
        }),
      });
      setFounder({
        ...updated,
        _experience: JSON.stringify(updated.experience ?? [], null, 2),
        _education: JSON.stringify(updated.education ?? [], null, 2),
        _skills: JSON.stringify(updated.skills ?? [], null, 2),
        _achievements: JSON.stringify(updated.achievements ?? [], null, 2),
        _certificates: JSON.stringify(updated.certificates ?? [], null, 2),
        _timeline: JSON.stringify(updated.timeline ?? [], null, 2),
      });
      setMessage("Founder profile saved");
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (error && !founder) return <p className="text-danger">{error}</p>;
  if (!founder) return <p className="text-muted">Loading founder...</p>;

  const fields = [
    ["name", "Name"],
    ["title", "Title"],
    ["photo", "Photo URL"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["linkedinUrl", "LinkedIn"],
    ["githubUrl", "GitHub"],
    ["resumeUrl", "Resume URL"],
  ] as const;

  const jsonFields = [
    ["_experience", "Experience (JSON)"],
    ["_education", "Education (JSON)"],
    ["_skills", "Skills (JSON)"],
    ["_achievements", "Achievements (JSON)"],
    ["_certificates", "Certificates (JSON)"],
    ["_timeline", "Timeline (JSON)"],
  ] as const;

  if (!founder._experience) {
    founder._experience = JSON.stringify(founder.experience ?? [], null, 2);
    founder._education = JSON.stringify(founder.education ?? [], null, 2);
    founder._skills = JSON.stringify(founder.skills ?? [], null, 2);
    founder._achievements = JSON.stringify(founder.achievements ?? [], null, 2);
    founder._certificates = JSON.stringify(founder.certificates ?? [], null, 2);
    founder._timeline = JSON.stringify(founder.timeline ?? [], null, 2);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Manage Founder</h1>
        <p className="mt-1 text-sm text-muted">Update founder profile content for the public site.</p>
      </div>
      {message && <p className="text-sm text-success">{message}</p>}
      {error && <p className="text-sm text-danger">{error}</p>}
      <Card>
        <CardContent className="space-y-4 p-6">
          {fields.map(([key, label]) => (
            <div key={key}>
              <Label htmlFor={`founder-${key}`}>{label}</Label>
              {key === "photo" ? (
                <div className="space-y-2">
                  <Input
                    id={`founder-${key}`}
                    value={founder[key] || ""}
                    onChange={(e) => setFounder({ ...founder, [key]: e.target.value })}
                    placeholder="Photo URL or upload below"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-panel px-3 py-2 text-xs font-medium">
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingPhoto(true);
                          try {
                            const result = await uploadMedia(file);
                            if (result?.url) setFounder({ ...founder, photo: result.url });
                          } catch (err: any) {
                            setError(err.message);
                          } finally {
                            setUploadingPhoto(false);
                            e.target.value = "";
                          }
                        }}
                      />
                      {uploadingPhoto ? "Uploading..." : "Upload photo"}
                    </label>
                    {founder.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={founder.photo} alt="Founder preview" className="h-12 w-12 rounded-full object-cover" />
                    )}
                  </div>
                </div>
              ) : (
                <Input
                  id={`founder-${key}`}
                  value={founder[key] || ""}
                  onChange={(e) => setFounder({ ...founder, [key]: e.target.value })}
                />
              )}
            </div>
          ))}
          <div>
            <Label>Biography</Label>
            <Textarea
              value={founder.biography || ""}
              onChange={(e) => setFounder({ ...founder, biography: e.target.value })}
            />
          </div>
          {jsonFields.map(([key, label]) => (
            <div key={key}>
              <Label>{label}</Label>
              <Textarea
                className="font-mono text-xs"
                value={founder[key] || "[]"}
                onChange={(e) => setFounder({ ...founder, [key]: e.target.value })}
              />
            </div>
          ))}
          <Button onClick={save}>Save Founder</Button>
        </CardContent>
      </Card>
    </div>
  );
}
