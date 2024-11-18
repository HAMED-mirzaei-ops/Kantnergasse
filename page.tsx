'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { MapPin, Download, Phone, Mail, ChevronRight, Euro, FileText } from 'lucide-react'

type Apartment = {
  id: number;
  rooms: number;
  size: number;
  price: number;
  description: string;
}

export default function BauprojektSeite() {
  const [priceRange, setPriceRange] = useState([200000, 800000])
  const [roomRange, setRoomRange] = useState([1, 6])
  const [sizeRange, setSizeRange] = useState([50, 150])

  const apartments: Apartment[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    rooms: Math.floor(Math.random() * (6 - 1 + 1) + 1),
    size: Math.floor(Math.random() * (150 - 50 + 1) + 50),
    price: Math.floor(Math.random() * (800000 - 200000 + 1) + 200000),
    description: `${i % 3 === 0 ? "Geräumige" : i % 3 === 1 ? "Moderne" : "Elegante"} Wohnung mit ${i % 2 === 0 ? "Balkon" : "Terrasse"}.`
  }))

  const filteredApartments = apartments.filter(
    apt => apt.price >= priceRange[0] && apt.price <= priceRange[1] &&
           apt.rooms >= roomRange[0] && apt.rooms <= roomRange[1] &&
           apt.size >= sizeRange[0] && apt.size <= sizeRange[1]
  )

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="font-bold">Bauprojekt Kantnergasse</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#projekt" className="text-sm font-medium hover:underline underline-offset-4">Projekt</Link>
            <Link href="#wohnungen" className="text-sm font-medium hover:underline underline-offset-4">Wohnungen</Link>
            <Link href="#lage" className="text-sm font-medium hover:underline underline-offset-4">Lage</Link>
            <Link href="#kontakt" className="text-sm font-medium hover:underline underline-offset-4">Kontakt</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section id="projekt" className="py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <Image src="/placeholder.svg" alt="Projekt Hero Bild" width={600} height={400} className="rounded-lg object-cover" />
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Bauprojekt Kantnergasse 44</h1>
                <p className="text-muted-foreground">
                  Erleben Sie modernes Wohnen in unserem neuesten Bauprojekt in der Kantnergasse 44. Entworfen mit Komfort und Stil im Sinn,
                  bieten unsere 20 einzigartigen Wohnungen die perfekte Mischung aus Luxus und Funktionalität.
                </p>
                <Button>Mehr erfahren</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="wohnungen" className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8">Verfügbare Wohnungen</h2>
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>Preis (€)</Label>
                <Slider
                  min={200000}
                  max={800000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0].toLocaleString()} €</span>
                  <span>{priceRange[1].toLocaleString()} €</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Zimmeranzahl</Label>
                <Slider
                  min={1}
                  max={6}
                  step={1}
                  value={roomRange}
                  onValueChange={setRoomRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{roomRange[0]} Zimmer</span>
                  <span>{roomRange[1]} Zimmer</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Größe (m²)</Label>
                <Slider
                  min={50}
                  max={150}
                  step={5}
                  value={sizeRange}
                  onValueChange={setSizeRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{sizeRange[0]} m²</span>
                  <span>{sizeRange[1]} m²</span>
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApartments.map((wohnung) => (
                <Card key={wohnung.id}>
                  <CardHeader>
                    <CardTitle>Wohnung {wohnung.id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image src="/placeholder.svg" alt={`Wohnung ${wohnung.id}`} width={300} height={200} className="rounded-lg object-cover mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{wohnung.description}</p>
                      <p className="flex items-center"><Euro className="mr-2 h-4 w-4" /> Preis: {wohnung.price.toLocaleString()} €</p>
                      <p className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> Größe: {wohnung.size} m²</p>
                      <p className="flex items-center"><ChevronRight className="mr-2 h-4 w-4" /> Zimmer: {wohnung.rooms}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" /> Grundriss herunterladen
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" /> Exposé herunterladen
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="lage" className="py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Erstklassige Lage</h2>
                <p className="text-muted-foreground">
                  Unser Projekt in der Kantnergasse 44 mit 20 exklusiven Wohnungen befindet sich im Herzen der Stadt und bietet einfachen Zugang zu öffentlichen Verkehrsmitteln,
                  Einkaufszentren und Freizeiteinrichtungen.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> 5 Minuten zur nächsten U-Bahn-Station</li>
                  <li className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> 10 Minuten zur Innenstadt</li>
                  <li className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> Mehrere Parks in Gehweite</li>
                </ul>
              </div>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Kartenplatzhalter</p>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8">Kontaktieren Sie uns</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Immobilienmakler</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center space-x-4">
                  <Image src="/placeholder.svg" alt="Immobilienmakler Foto" width={100} height={100} className="rounded-full" />
                  <div className="space-y-2">
                    <p className="flex items-center"><Phone className="mr-2 h-4 w-4" /> +49 123 456 7890</p>
                    <p className="flex items-center"><Mail className="mr-2 h-4 w-4" /> makler@beispiel.de</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Anfrageformular</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <Input placeholder="Ihr Name" />
                    <Input type="email" placeholder="Ihre E-Mail" />
                    <Input type="tel" placeholder="Ihre Telefonnummer" />
                    <Textarea placeholder="Ihre Nachricht" />
                    <Button type="submit">Anfrage senden</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bauprojekt Kantnergasse. Alle Rechte vorbehalten.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4">Nutzungsbedingungen</Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">Datenschutz</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}