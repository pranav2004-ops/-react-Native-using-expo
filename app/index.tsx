 import DateSelector from "@/components/DateSelector";
import FilterTabs from "@/components/FilterTabs";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import Colors from "@/constants/Colors";
import { FilterOptions, TASKS } from "@/constants/tasks";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Index = () => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterOptions>("All");

  // Filter tasks based on selected filter
  const filteredTasks = useMemo(() => {
    if (activeFilter === "All") return TASKS;
    return TASKS.filter((task) => task.status === activeFilter);
  }, [activeFilter]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
        ListHeaderComponent={
          <>
            {/* Header */}
            <Header />
            {/* DateSelector */}
            <DateSelector />
            {/* FiltersTabs */}
            <FilterTabs selected={activeFilter} onSelect={setActiveFilter} />
          </>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks found</Text>
          </View>
        }
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
  },
});