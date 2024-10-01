"use client"

import React, { useState, useEffect } from "react"
import { ChevronDown, Plus, ChevronRight, ChevronDown as ChevronDownIcon, BarChart2 } from "lucide-react"
import { people, socialNetworks } from "../app/constants/constants"
import { Entry, GroupedEntries, Person, SocialNetwork } from "@/app/types/types"
import useTimeWasterUtils from "@/app/hooks/useTimeWasterUtils"
import useFetchApi from "@/app/hooks/useFetchApi"

export function TimeWasterTracker() {
  const [entries, setEntries] = useState<GroupedEntries>({})
  const [selectedNetwork, setSelectedNetwork] = useState<SocialNetwork>(socialNetworks[0])
  const [selectedPerson, setSelectedPerson] = useState<Person>(people[0])
  const [timeSpent, setTimeSpent] = useState<number>(1)
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState<boolean>(false)
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>([])
  const [expandedPeople, setExpandedPeople] = useState<string[]>([])
  const { getWeekKey, getIcon, formatTime, calculateTotalTimeForPerson, groupEntriesByNetwork } = useTimeWasterUtils();
  const { createEntry, fetchEntries } = useFetchApi();

  useEffect(() => {
    const loadEntries = async () => {
      const data = await fetchEntries();
      console.log("la data es: ", data)
      const groupedEntries = data.reduce((acc: GroupedEntries, entry: Entry) => {
        const weekKey = getWeekKey(new Date(entry.date))
        if (!acc[weekKey]) {
          acc[weekKey] = []
        }
        acc[weekKey].push(entry)
        return acc
      }, {})

      // Filtrar semanas vacías
      const filteredEntries = Object.keys(groupedEntries).reduce((acc, weekKey) => {
        if (groupedEntries[weekKey].length > 0) {
          acc[weekKey] = groupedEntries[weekKey]
        }
        return acc
      }, {} as GroupedEntries)

      setEntries(filteredEntries)
    }

    loadEntries();
  }, [])

  const addEntry = async () => {
    const today = new Date()
    const weekKey = getWeekKey(today)
    const newEntry: Entry = {
      _id: Date.now().toString()
      date: today.toISOString(),
      network: selectedNetwork.name,
      person: selectedPerson.name,
      time: timeSpent
    }

    const savedEntry = await createEntry(newEntry);

    setEntries(prev => {
      const updatedEntries = {
        ...prev,
        [weekKey]: [...(prev[weekKey] || []), savedEntry.data]
      }
      const filteredEntries = Object.keys(updatedEntries).reduce((acc, weekKey) => {
        if (updatedEntries[weekKey].length > 0) {
          acc[weekKey] = updatedEntries[weekKey]
        }
        return acc
      }, {} as GroupedEntries)

      return filteredEntries
    })
    setTimeSpent(1)
  }


  const toggleWeekExpansion = (week: string) => {
    setExpandedWeeks(prev => 
      prev.includes(week) ? prev.filter(w => w !== week) : [...prev, week]
    )
  }

  const togglePersonExpansion = (person: string) => {
    setExpandedPeople(prev => 
      prev.includes(person) ? prev.filter(p => p !== person) : [...prev, person]
    )
  }



  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-purple-400">Tracker de Pérdida de Tiempo</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <BarChart2 className="mr-2" />
          <span>Estadísticas</span>
        </button>
      </div>
      
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap md:flex-nowrap items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
              className="w-full px-4 py-2 text-left bg-purple-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-between"
            >
              <span className="flex items-center">
                {selectedNetwork.icon && <selectedNetwork.icon className="mr-2" />}
                {selectedNetwork.name}
              </span>
              <ChevronDown className="ml-2" />
            </button>
            {isNetworkDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-purple-900 rounded-md shadow-lg">
                {socialNetworks.map((network) => (
                  <button
                    key={network.name}
                    onClick={() => {
                      setSelectedNetwork(network)
                      setIsNetworkDropdownOpen(false)
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-purple-800 focus:outline-none focus:bg-purple-800 flex items-center"
                  >
                    {network.icon && <network.icon className="mr-2" />}
                    {network.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="number"
            min="1"
            max="60"
            value={timeSpent}
            onChange={(e) => setTimeSpent(Math.min(60, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full md:w-24 px-4 py-2 bg-purple-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addEntry}
            className="w-full md:w-auto px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center"
          >
            <Plus className="mr-2" />
            Agregar
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center md:justify-start mb-4 bg-purple-900 p-2 rounded-md">
        {people.map((person) => (
          <button
            key={person.name}
            onClick={() => setSelectedPerson(person)}
            className={`flex items-center justify-center p-2 m-1 rounded-md transition-colors duration-200 ${
              selectedPerson.name === person.name ? 'bg-purple-600 text-white' : 'bg-purple-800 text-purple-200 hover:bg-purple-700'
            }`}
          >
            <person.icon className="text-current mr-2" />
            <span>{person.name}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {Object.entries(entries).sort(([a], [b]) => b.localeCompare(a)).map(([week, weekEntries]) => (
          <div key={week} className="bg-purple-900 p-4 rounded-md">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleWeekExpansion(week)}
            >
              <span className="font-semibold">{week}</span>
              {expandedWeeks.includes(week) ? <ChevronDownIcon /> : <ChevronRight />}
            </div>
            {expandedWeeks.includes(week) && (
              <div className="mt-2 space-y-2">
                {people
                  .map(person => ({
                    ...person,
                    totalTime: calculateTotalTimeForPerson(weekEntries, person.name)
                  }))
                  .sort((a, b) => b.totalTime - a.totalTime)
                  .map(({ name, icon: PersonIcon, totalTime }) => (
                    <div key={name} className="bg-purple-800 p-2 rounded-md">
                      <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => togglePersonExpansion(name)}
                      >
                        <span className="flex items-center">
                          <PersonIcon className="mr-2" />
                          {name} - {formatTime(totalTime)}
                        </span>
                        {expandedPeople.includes(name) ? <ChevronDownIcon /> : <ChevronRight />}
                      </div>
                      {expandedPeople.includes(name) && (
                        <div className="mt-2 ml-4 space-y-1">
                          {Object.entries(groupEntriesByNetwork(weekEntries, name)).map(([network, time]) => {
                            const NetworkIcon = getIcon(network)
                            return (
                              <div key={network} className="flex items-center">
                                {NetworkIcon && <NetworkIcon className="mr-2" />}
                                <span>{network}: {formatTime(time)}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}